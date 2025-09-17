package com.axelin.ai.service;

import com.axelin.ai.dto.CategoryDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class CategoryService {

    private final RestClient restClient;

    public CategoryService(RestClient.Builder restClientBuilder, @Value("${supabase.url}") String supabaseUrl, @Value("${supabase.key}") String supabaseKey) {
        this.restClient = restClientBuilder
                .baseUrl(supabaseUrl)
                .defaultHeader("apikey", supabaseKey)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + supabaseKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public List<CategoryDTO> getAllCategories() {
        return restClient.get()
                .uri("/rest/v1/categories?select=*")
                .retrieve()
                .body(new ParameterizedTypeReference<List<CategoryDTO>>() {});
    }

    public CategoryDTO getCategoryById(Integer id) {
        List<CategoryDTO> result = restClient.get()
                .uri("/rest/v1/categories?id=eq.{id}&select=*", id)
                .retrieve()
                .body(new ParameterizedTypeReference<List<CategoryDTO>>() {});
        return result != null && !result.isEmpty() ? result.get(0) : null;
    }

    public CategoryDTO createCategory(CategoryDTO category) {
        List<CategoryDTO> result = restClient.post()
                .uri("/rest/v1/categories")
                .header("Prefer", "return=representation")
                .body(category)
                .retrieve()
                .body(new ParameterizedTypeReference<List<CategoryDTO>>() {});
        return result != null && !result.isEmpty() ? result.get(0) : null;
    }

    public CategoryDTO updateCategory(Integer id, CategoryDTO category) {
        List<CategoryDTO> result = restClient.patch()
                .uri("/rest/v1/categories?id=eq.{id}", id)
                .header("Prefer", "return=representation")
                .body(category)
                .retrieve()
                .body(new ParameterizedTypeReference<List<CategoryDTO>>() {});
        return result != null && !result.isEmpty() ? result.get(0) : null;
    }

    public void deleteCategory(Integer id) {
        restClient.delete()
                .uri("/rest/v1/categories?id=eq.{id}", id)
                .retrieve()
                .toBodilessEntity();
    }
}
