package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepo extends JpaRepository<OrderDetails, Long> {
    List<OrderDetails> findByOrderOrderId(Long orderId);
}
