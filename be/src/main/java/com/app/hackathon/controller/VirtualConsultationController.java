package com.app.hackathon.controller;


import com.app.hackathon.request.ConsultationRequest;
import com.app.hackathon.service.EmailService;
import com.app.hackathon.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class VirtualConsultationController {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/create-consultation")
    public boolean getConsultation(@RequestHeader("Authorization") String token, @RequestBody ConsultationRequest consultationRequest){
        token = token.substring(7);

        String email = jwtService.extractEmail(token);

        emailService.sendEmail(email,"Virtual consultation confirmation.","Your virtual consultation with "+consultationRequest.doctorName+" is scheduled with link "+consultationRequest.zoomLink);
        return true;
    }
}
