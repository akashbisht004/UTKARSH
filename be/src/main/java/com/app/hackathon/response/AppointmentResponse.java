package com.app.hackathon.response;

import com.app.hackathon.entity.Appointment;
import lombok.Data;

@Data
public class AppointmentResponse {
    private Appointment appointment;

    private HospitalResponse hospital;
}
