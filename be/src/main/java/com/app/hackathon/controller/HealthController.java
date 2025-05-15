package com.app.hackathon.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping("/appHealthCheck")
    public String health(){
        return "Healthy";
    }
}
