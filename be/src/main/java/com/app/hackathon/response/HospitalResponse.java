package com.app.hackathon.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class HospitalResponse{
    public String type;
    public String id;
    public String lat;
    public String lon;
    public Tags tags;

    public static class Tags{
        public String amenity;
        public String emergency;
        public String name;

        @JsonProperty("addr:district")
        public String addr_district;

        @JsonProperty("addr:full")
        public String addr_full;

        @JsonProperty("addr:postcode")
        public String addr_postcode;

        @JsonProperty("addr:state")
        public String addr_state;

        public String source;

        @JsonProperty("addr:city")
        public String addr_city;

        @JsonProperty("addr:housenumber")
        public String addr_housenumber;

        @JsonProperty("addr:street")
        public String addr_street;

        public String healthcare;

        @JsonProperty("healthcare:speciality")
        public String healthcare_speciality;

        public String opening_hours;

        @JsonProperty("addr:block")
        public String addr_block;

        public String wheelchair;

        public String email;

        @JsonProperty("operator:type")
        public String operator_type;

        public String website;

        public String description;
    }
}


