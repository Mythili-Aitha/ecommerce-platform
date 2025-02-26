package net.ecommerce.ecom_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product_dimensions")
public class ProductDimensions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double width;
    private Double height;
    private Double depth;

    @OneToOne
    @JoinColumn(name = "products_id", nullable = false)
    private Products products;
}
