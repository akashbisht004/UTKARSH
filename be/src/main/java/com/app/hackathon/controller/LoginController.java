package com.app.hackathon.controller;

import com.app.hackathon.entity.User;
import com.app.hackathon.response.LoginResponse;
import com.app.hackathon.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private UserDetailService userDetailService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody User user){
        LoginResponse loginResponse = new LoginResponse();
        String token = userDetailService.verify(user);

        if(token != null){
            loginResponse.setStatus(true);
            loginResponse.setToken(token);

            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        }

        loginResponse.setStatus(false);
        loginResponse.setToken(null);

        return new ResponseEntity<>(loginResponse,HttpStatus.OK);
    }
}
