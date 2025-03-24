package net.ecommerce.ecom_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String title;
    private String description;
    private String category;
    private Double price;
    private Double rating;
    private Integer stock;
    private String brand;
    private String sku;
    private List<String> tags;
    private DimensionsDto dimensions;
    private List<ReviewDto> reviews;
    private MetaDto meta;
    private List<String> images;
    private String thumbnail;
    private Double discountPercentage;
    private LocalDateTime discountAppliedAt;

}
