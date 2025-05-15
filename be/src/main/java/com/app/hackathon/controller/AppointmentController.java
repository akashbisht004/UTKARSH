package com.app.hackathon.controller;

import com.app.hackathon.response.AppointmentResponse;
import com.app.hackathon.service.AppointmentService;
import com.app.hackathon.service.JwtService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppointmentController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/bookAppointment/{hospitalId}")
    public ResponseEntity<Boolean> book(@RequestHeader("Authorization") String token, @PathVariable("hospitalId") String hospitalId){
        if(token!=null){
            token = token.substring(7);
        }
        else{
            return new ResponseEntity<>(false, HttpStatus.OK);
        }

        String email = jwtService.extractEmail(token);

        boolean booked = appointmentService.book(email,hospitalId);

        return new ResponseEntity<>(booked,HttpStatus.OK);
    }

    @DeleteMapping("/appointment/delete/{id}")
    public void delete(@RequestHeader("Authorization") String token,@PathVariable("id") String appointmentId){
        if(token!=null){
            token = token.substring(7);
        }
        else{
            return;
        }
        ObjectId appointment = new ObjectId(appointmentId);
        String email = jwtService.extractEmail(token);
        appointmentService.delete(email,appointment);
    }


    @GetMapping("/getAppointments")
    public ResponseEntity<List<AppointmentResponse>> getAppointments(@RequestHeader("Authorization") String token){
        if(token!=null){
            token = token.substring(7);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.OK);
        }

        String email = jwtService.extractEmail(token);

        List<AppointmentResponse> appointments = appointmentService.getUserAppointments(email);

        return new ResponseEntity<>(appointments,HttpStatus.OK);
    }
}
