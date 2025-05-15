package com.app.hackathon.entity;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "reports")
@Data
public class Report {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private String email;

    private String image;

    private ArrayList<String> reviews = new ArrayList<>();
}
