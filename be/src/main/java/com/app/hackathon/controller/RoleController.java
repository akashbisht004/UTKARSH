package com.app.hackathon.controller;

import com.app.hackathon.entity.User;
import com.app.hackathon.service.JwtService;
import com.app.hackathon.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailService userDetailService;

    @GetMapping("/user/role")
    public ResponseEntity<String> getRole(@RequestHeader("Authorization") String token){
        String email = null;
        if(token.startsWith("Bearer ")){
            token = token.substring(7);
            email = jwtService.extractEmail(token);
        }
        else {
            return null;
        }

        User dbUser = userDetailService.find(email);

        return new ResponseEntity<>(dbUser.getRole(), HttpStatus.OK);
    }
}
