package com.axelin.ai.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class OrderDTO {
    private UUID id;
    private UUID buyerId;
    private BigDecimal totalAmount;
    private String status;
    private OffsetDateTime createdAt;
}
