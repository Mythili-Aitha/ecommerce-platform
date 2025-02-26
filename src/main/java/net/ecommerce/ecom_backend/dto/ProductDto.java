package net.ecommerce.ecom_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String brand;
    private String sku;
    private Double rating;
    private List<String> tags;
    private List<String> images;
    private String thumbnail;
    private String category;
    private ProductMetaDto meta;
    private ProductDimensionsDto dimensions = new ProductDimensionsDto(0.0, 0.0, 0.0);
    private List<ProductReviewDto> reviews;

}
