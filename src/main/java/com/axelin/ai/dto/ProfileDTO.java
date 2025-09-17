package com.axelin.ai.dto;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class ProfileDTO {
    private UUID id;
    private String username;
    private String avatarUrl;
    private String bio;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
