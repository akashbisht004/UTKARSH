package com.app.hackathon.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Date;


public class OverpassResponse{
    public double version;
    public String generator;
    @JsonProperty("osm3s")
    public Osm3s osm3s;
    @JsonProperty("elements")
    public ArrayList<HospitalResponse> hospitalResponses;

    public static class Osm3s{
        public Date timestamp_osm_base;
        public String copyright;
    }
}

