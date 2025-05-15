package com.app.hackathon.service;

import com.app.hackathon.entity.Report;
import com.app.hackathon.repository.ReportRepository;
import com.app.hackathon.request.ReportRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    List<Report> findUserReports(String email){
        return reportRepository.findByEmail(email);
    }


    public List<Report> getAll() {
        return reportRepository.findAll();
    }

    public List<Report> getUserReports(String email) {
        return reportRepository.findByEmail(email);
    }

    public void update(Report report) {
        reportRepository.save(report);
    }

    public void saveReport(String email, ReportRequest reportRequest) {
        Report report = new Report();
        report.setEmail(email);
        report.setImage(reportRequest.image);
        report.setReviews(reportRequest.reviews);

        reportRepository.save(report);
    }
}
