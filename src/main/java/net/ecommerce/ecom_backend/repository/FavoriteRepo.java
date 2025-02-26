package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepo extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserUserId(Long userId);
    boolean existsByUserUserIdAndProductId(Long userId, Long productId);
    void deleteByUserUserIdAndProductId(Long userId, Long productId);
}
