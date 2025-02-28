package net.ecommerce.ecom_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Double totalPrice;
    private LocalDateTime orderDate;
    private String orderStatus;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL,orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderDetails> orderDetails= new ArrayList<>();
    public void setOrderDetails(List<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
        orderDetails.forEach(details -> details.setOrder(this)); // ✅ Ensures `OrderDetails` has the correct reference
    }
}
