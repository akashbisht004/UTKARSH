package com.app.hackathon.controller;

import com.app.hackathon.entity.User;
import com.app.hackathon.service.JwtService;
import com.app.hackathon.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserDetailService userDetailService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/get/user")
    public ResponseEntity<User> getUser(@RequestHeader("Authorization") String token){
        if(token!=null){
            token = token.substring(7);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.OK);
        }

        String email = jwtService.extractEmail(token);

        User user =  userDetailService.loadUserByUsername(email);

        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @GetMapping("/deleteUser/{id}")
    public boolean deleteUser(@PathVariable("id") String userId){
        userDetailService.delete(userId);
        return true;
    }

}
