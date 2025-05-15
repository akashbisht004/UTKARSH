package com.app.hackathon.repository;

import com.app.hackathon.entity.Report;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends MongoRepository<Report, ObjectId> {
    List<Report> findByEmail(String email);
}
