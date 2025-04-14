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
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer rating;
    private String comment;
    private String date;
    private String reviewerName;
    private String reviewerEmail;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
