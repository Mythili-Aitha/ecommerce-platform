package net.ecommerce.ecom_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_Id", nullable = false)
    @NonNull private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @NonNull private Product product;

    @NonNull private int quantity;
}
