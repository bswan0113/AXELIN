package com.axelin.ai.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class OrderItemDTO {
    private Long id;
    private UUID orderId;
    private UUID productId;
    private BigDecimal priceAtPurchase;
}
