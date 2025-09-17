package com.axelin.ai.dto;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class ReviewDTO {
    private Long id;
    private UUID productId;
    private UUID reviewerId;
    private Integer rating;
    private String comment;
    private OffsetDateTime createdAt;
}
