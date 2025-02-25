package net.ecommerce.ecom_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, length = 1000)
    private String description;
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    @Column(nullable = false)
    private Integer stockQuantity;
    @Column(nullable = false)
    private String brand;
    @Column(nullable = false, unique = true)
    private String sku;
    @Column(nullable = false)
    private Double rating;
    @ElementCollection
    private List<String> tags;

    @ElementCollection
    private List<String> images;

    @Column(nullable = false)
    private String thumbnail;

    @OneToOne(mappedBy = "products", cascade = CascadeType.ALL, orphanRemoval = true)
    private ProductMeta meta;

    @OneToOne(mappedBy = "products", cascade = CascadeType.ALL, orphanRemoval = true)
    private ProductDimensions dimensions;

    @OneToMany(mappedBy = "products", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductReview> reviews;

    @Column(nullable = false,updatable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }


}
