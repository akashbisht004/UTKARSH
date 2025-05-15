package com.app.hackathon.controller;

import com.app.hackathon.entity.Report;
import com.app.hackathon.request.ReportRequest;
import com.app.hackathon.service.JwtService;
import com.app.hackathon.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/getAllReports")
    public ResponseEntity<List<Report>> getAllReports(){
        List<Report> reports = reportService.getAll();

        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @GetMapping("/getUserReports")
    public ResponseEntity<List<Report>> getAllUserReports(@RequestHeader("Authorization") String token){
        token = token.substring(7);
        String email = jwtService.extractEmail(token);
        List<Report> userReports = reportService.getUserReports(email);

        return new ResponseEntity<>(userReports,HttpStatus.OK);
    }

    @PostMapping("/makeChanges")
    public boolean makeChanges(@RequestBody Report report){
        reportService.update(report);
        return true;
    }

    @PostMapping("/report/save")
    public boolean saveReport(@RequestHeader("Authorization") String token,@RequestBody ReportRequest reportRequest){
        token=token.substring(7);

        String email = jwtService.extractEmail(token);

        reportService.saveReport(email,reportRequest);

        return true;
    }

}
