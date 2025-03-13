package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    @Query("select distinct p.category from Product p")
    List<String> findAllCategories();
    Long countByStockLessThan(int stockThreshold);
}
