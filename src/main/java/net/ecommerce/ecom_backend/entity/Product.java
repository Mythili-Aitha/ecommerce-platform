package net.ecommerce.ecom_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String category;
    private Double price;
    private Double rating;
    private Integer stock;
    private String brand;
    private String sku;

    @ElementCollection
    private List<String> tags;

    @Embedded
    private Dimensions dimensions;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @Embedded
    private Meta meta;

    @ElementCollection
    private List<String> images;
    private String thumbnail;

    private Double discountPercentage = 0.0;
    private LocalDateTime discountAppliedAt;


}
