package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Products, Long> {
}
