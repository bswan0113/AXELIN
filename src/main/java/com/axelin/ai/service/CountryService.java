package com.axelin.ai.service;

import com.axelin.ai.dto.Country;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class CountryService {

    private final RestClient restClient;

    public CountryService(RestClient.Builder restClientBuilder, @Value("${supabase.url}") String supabaseUrl, @Value("${supabase.key}") String supabaseKey) {
        this.restClient = restClientBuilder
                .baseUrl(supabaseUrl)
                .defaultHeader("apikey", supabaseKey)
                .defaultHeader("Authorization", "Bearer " + supabaseKey)
                .build();
    }

    public List<Country> getCountries() {
        return restClient.get()
                .uri("/rest/v1/countries?select=*")
                .retrieve()
                .body(new ParameterizedTypeReference<List<Country>>() {});
    }
}
