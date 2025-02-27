package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepo extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserUserId(Long userId);
    Optional<Favorite> findByUserUserIdAndProductId(Long userId, Long productId);
    boolean existsByUserUserIdAndProductId(Long userId, Long productId);
    void deleteByUserUserIdAndProductId(Long userId, Long productId);
}
