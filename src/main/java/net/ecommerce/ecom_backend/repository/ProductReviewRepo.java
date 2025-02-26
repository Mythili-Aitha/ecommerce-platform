package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductReviewRepo extends JpaRepository<ProductReview, Long> {
}
