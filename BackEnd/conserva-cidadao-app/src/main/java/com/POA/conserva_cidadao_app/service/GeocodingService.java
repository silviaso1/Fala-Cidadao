package com.POA.conserva_cidadao_app.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

@Service
public class GeocodingService {

    @Value("${google.geocoding.api.key}")
    private String apiKey;

    @Value("${google.geocoding.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Double> getLatLng(String endereco) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("address", endereco)
                .queryParam("key", apiKey)
                .encode()
                .toUriString();

        GoogleResponse response = restTemplate.getForObject(url, GoogleResponse.class);

        if (response != null &&
                response.results != null &&
                !response.results.isEmpty() &&
                response.results.get(0) != null &&
                response.results.get(0).geometry != null &&
                response.results.get(0).geometry.location != null) {

            Location location = response.results.get(0).geometry.location;
            return Map.of(
                    "latitude", location.lat,
                    "longitude", location.lng
            );
        }
        throw new RuntimeException("Endereço não encontrado");
    }

    private static class GoogleResponse {
        public List<Result> results;
    }

    private static class Result {
        public Geometry geometry;
    }

    private static class Geometry {
        public Location location;
    }

    private static class Location {
        public double lat;
        public double lng;
    }
}