package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepo extends JpaRepository<Cart, Long> {
    List<Cart> findByUserUserId(Long userId);
    Optional<Cart> findByUserUserIdAndProductId(Long userId, Long productId);
}
