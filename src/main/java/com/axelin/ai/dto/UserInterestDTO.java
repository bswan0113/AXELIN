package com.axelin.ai.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserInterestDTO {
    private UUID userId;
    private Integer categoryId;
}
