package com.app.hackathon.service;

import com.app.hackathon.entity.Appointment;
import com.app.hackathon.entity.User;
import com.app.hackathon.repository.AppointmentRepository;
import com.app.hackathon.repository.UserRepository;
import com.app.hackathon.response.AppointmentResponse;
import com.app.hackathon.response.HospitalResponse;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private EmailService emailService;

    public boolean book(String email, String hospitalId) {
        Appointment appointment = new Appointment();
        appointment.setUserEmail(email);
        appointment.setHospitalId(hospitalId);
        appointment.setTimestamp(LocalDateTime.now());
        Appointment dbAppointment = appointmentRepository.save(appointment);

        if(dbAppointment==null) return false;

        User user = userRepository.findByEmail(email);
        if(user == null) return false;
        List<Appointment> userAppointments = user.getAppointments();

        if(userAppointments==null){
            userAppointments=new ArrayList<>();
        }
        userAppointments.add(appointment);
        user.setAppointments(userAppointments);
        User dbUser = userRepository.save(user);

        if(dbUser==null) return false;

        HospitalResponse hospitalResponse = hospitalService.getById(hospitalId);

        emailService.sendEmail(email,"Appointment booking confirmation","your appointment with "+hospitalResponse.tags.name+" is scheduled on "+LocalDateTime.now().plusDays(5));

        return true;
    }


    public void delete(String email, ObjectId appointment) {
        Optional<Appointment> dbAppointment = appointmentRepository.findById(appointment);

        if(dbAppointment.isPresent()){
            Appointment appointmentFetched = dbAppointment.get();
            User user = userRepository.findByEmail(email);
            for(Appointment i:user.getAppointments()){
                if(i.getId().equals(appointment)){
                    user.getAppointments().remove(i);
                    userRepository.save(user);
                    break;
                }
            }
        }

        appointmentRepository.deleteById(appointment);
    }

    public List<AppointmentResponse> getUserAppointments(String email) {
        User user = userRepository.findByEmail(email);

        List<AppointmentResponse> appointmentResponses = new ArrayList<>();

        for(Appointment i:user.getAppointments()){
            AppointmentResponse temp = new AppointmentResponse();

            HospitalResponse hospitalResponse = hospitalService.getById(i.getHospitalId());

            temp.setAppointment(i);
            temp.setHospital(hospitalResponse);
            appointmentResponses.add(temp);
        }

        return appointmentResponses;
    }

    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }

    public void deleteAppointmentByAdmin(ObjectId objectId) {
        appointmentRepository.deleteById(objectId);
    }
}
