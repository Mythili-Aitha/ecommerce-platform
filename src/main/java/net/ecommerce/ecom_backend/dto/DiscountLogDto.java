package net.ecommerce.ecom_backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DiscountLogDto {
    private Long productId;
    private String productTitle;
    private double originalPrice;
    private double discountApplied;
    private LocalDateTime discountDate;
}
