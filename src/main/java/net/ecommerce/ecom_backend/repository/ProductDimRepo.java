package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.ProductDimensions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDimRepo extends JpaRepository<ProductDimensions, Long> {
}
