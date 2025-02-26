package net.ecommerce.ecom_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteDto {
    private Long id;
    private Long userId;
    private Long productId;
    private String productName;  // Extra field for convenience
    private String productImage; // Extra field for frontend display

}
