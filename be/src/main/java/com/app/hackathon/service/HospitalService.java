package com.app.hackathon.service;


import com.app.hackathon.response.HospitalResponse;
import com.app.hackathon.response.OverpassResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class HospitalService {

    private final WebClient webClient= WebClient.create();

    public List<HospitalResponse> getAllNear(String lat,String lon) {
        String overpassQuery = """
                                [out:json];
                                node["amenity"="hospital"](around:10000,"""+lat+"""
                                ,"""+lon+"""
                                );
                                out;
                                """;


        OverpassResponse overpassResponse = WebClient.create()
                .post()
                .uri("https://overpass-api.de/api/interpreter")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE)
                .bodyValue(overpassQuery)
                .retrieve()
                .bodyToMono(OverpassResponse.class)
                .block();

        assert overpassResponse != null;
        return overpassResponse.hospitalResponses;
    }

    public HospitalResponse getById(String id){
        String overpassQuery = """
                                [out:json];
                                node("""+id+"""
                                );
                                out;
                                """;

        OverpassResponse overpassResponse = WebClient.create()
                .post()
                .uri("https://overpass-api.de/api/interpreter")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE)
                .bodyValue(overpassQuery)
                .retrieve()
                .bodyToMono(OverpassResponse.class)
                .block();

        assert overpassResponse != null;
        return overpassResponse.hospitalResponses.getFirst();
    }

}
