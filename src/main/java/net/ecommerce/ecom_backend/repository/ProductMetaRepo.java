package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.ProductMeta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductMetaRepo extends JpaRepository<ProductMeta, Long> {
}
