package net.ecommerce.ecom_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    private Long id;
    private Long userId;
    private Long productId;
    private String productName;
    private String productImage;
    private double productPrice;
    private int quantity;
}
