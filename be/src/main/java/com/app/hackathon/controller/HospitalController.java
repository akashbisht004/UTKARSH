package com.app.hackathon.controller;

import com.app.hackathon.response.HospitalResponse;
import com.app.hackathon.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @GetMapping("/getHospitals/{lat}/{lon}")
    public ResponseEntity<List<HospitalResponse>> getAllNear(@PathVariable("lat") String lat,@PathVariable("lon") String lon){
        List<HospitalResponse> hospitals = hospitalService.getAllNear(lat,lon);

        return new ResponseEntity<>(hospitals, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<HospitalResponse> getById(@PathVariable("id") String id){
        HospitalResponse hospital = hospitalService.getById(id);

        return new ResponseEntity<>(hospital,HttpStatus.OK);
    }
}
