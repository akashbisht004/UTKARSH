package com.app.hackathon.controller;

import com.app.hackathon.entity.User;
import com.app.hackathon.response.RegisterResponse;
import com.app.hackathon.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {
    @Autowired
    private UserDetailService userDetailService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody User user){
        RegisterResponse registerResponse = new RegisterResponse();

        String token = userDetailService.register(user);

        if(token!=null){
            registerResponse.setToken(token);
            registerResponse.setStatus(true);
            return new ResponseEntity<>(registerResponse,HttpStatus.OK);
        }

        registerResponse.setToken(null);
        registerResponse.setStatus(false);
        return new ResponseEntity<>(registerResponse,HttpStatus.OK);
    }
}
