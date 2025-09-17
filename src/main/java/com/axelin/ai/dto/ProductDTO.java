package com.axelin.ai.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class ProductDTO {
    private UUID id;
    private UUID sellerId;
    private Long targetToolId;
    private String title;
    private String description;
    private BigDecimal price;
    private ProductType type;
    private ProductStatus status;
    private JsonNode content;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
