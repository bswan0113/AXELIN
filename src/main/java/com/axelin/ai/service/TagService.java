package com.axelin.ai.service;

import com.axelin.ai.dto.TagDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class TagService {

    private final RestClient restClient;

    public TagService(RestClient.Builder restClientBuilder, @Value("${supabase.url}") String supabaseUrl, @Value("${supabase.key}") String supabaseKey) {
        this.restClient = restClientBuilder
                .baseUrl(supabaseUrl)
                .defaultHeader("apikey", supabaseKey)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + supabaseKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public List<TagDTO> getAllTags() {
        return restClient.get()
                .uri("/rest/v1/tags?select=*")
                .retrieve()
                .body(new ParameterizedTypeReference<List<TagDTO>>() {});
    }

    public TagDTO getTagById(Integer id) {
        List<TagDTO> result = restClient.get()
                .uri("/rest/v1/tags?id=eq.{id}&select=*", id)
                .retrieve()
                .body(new ParameterizedTypeReference<List<TagDTO>>() {});
        return result != null && !result.isEmpty() ? result.get(0) : null;
    }

    public TagDTO createTag(TagDTO tag) {
        List<TagDTO> result = restClient.post()
                .uri("/rest/v1/tags")
                .header("Prefer", "return=representation")
                .body(tag)
                .retrieve()
                .body(new ParameterizedTypeReference<List<TagDTO>>() {});
        return result != null && !result.isEmpty() ? result.get(0) : null;
    }

    public TagDTO updateTag(Integer id, TagDTO tag) {
        List<TagDTO> result = restClient.patch()
                .uri("/rest/v1/tags?id=eq.{id}", id)
                .header("Prefer", "return=representation")
                .body(tag)
                .retrieve()
                .body(new ParameterizedTypeReference<List<TagDTO>>() {});
        return result != null && !result.isEmpty() ? result.get(0) : null;
    }

    public void deleteTag(Integer id) {
        restClient.delete()
                .uri("/rest/v1/tags?id=eq.{id}", id)
                .retrieve()
                .toBodilessEntity();
    }
}
