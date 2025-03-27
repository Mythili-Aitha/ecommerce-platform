package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartRepo extends JpaRepository<Cart, Long> {
    List<Cart> findByUserUserId(Long userId);
    Optional<Cart> findByUserUserIdAndProductId(Long userId, Long productId);
    @Modifying
    @Query("DELETE FROM Cart c WHERE c.user.userId = :userId AND c.product.id IN :productIds")
    void deleteByUserIdAndProductIds(@Param("userId") Long userId, @Param("productIds") List<Long> productIds);

}
