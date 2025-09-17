package com.axelin.ai.dto;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class AiToolDTO {
    private Long id;
    private String name;
    private String description;
    private String websiteUrl;
    private String logoUrl;
    private OffsetDateTime createdAt;
}
