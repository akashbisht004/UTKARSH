package com.app.hackathon.controller;

import com.app.hackathon.entity.Appointment;
import com.app.hackathon.entity.User;
import com.app.hackathon.response.AppointmentResponse;
import com.app.hackathon.service.AppointmentService;
import com.app.hackathon.service.HospitalService;
import com.app.hackathon.service.JwtService;
import com.app.hackathon.service.UserDetailService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class AdminController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private UserDetailService userDetailService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/getAllAppointments")
    public ResponseEntity<List<AppointmentResponse>> getALlAppointments(){
        List<Appointment> appointments =  appointmentService.getAll();

        List<AppointmentResponse> response = new ArrayList<>();

        for(Appointment i: appointments){
            AppointmentResponse appointmentResponse = new AppointmentResponse();
            appointmentResponse.setAppointment(i);
            appointmentResponse.setHospital(hospitalService.getById(i.getHospitalId()));
            response.add(appointmentResponse);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/deleteAppointment/{id}")
    public boolean deleteAppointment(@PathVariable("id") String appointmentId){
        ObjectId objectId = new ObjectId(appointmentId);

        appointmentService.deleteAppointmentByAdmin(objectId);
        return true;
    }


    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers(@RequestHeader("Authorization") String token){

        if(token != null){
            token = token.substring(7);
        }
        String email = jwtService.extractEmail(token);
        List<User> users = userDetailService.getAll();

        for(User user : users){
            if(user.getEmail().equals(email)){
                users.remove(user);
                break;
            }
        }

        return new ResponseEntity<>(users,HttpStatus.OK);
    }
}
