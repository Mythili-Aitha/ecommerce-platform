package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    @Query("select distinct p.category from Product p")
    List<String> findAllCategories();
//    @Query("SELECT p FROM Product p WHERE p.stock > :stockThreshold ORDER BY p.stock DESC")
//    List<Product> findTopHighStockProducts(@Param("stockThreshold") int threshold, Pageable pageable);
    List<Product> findTop10ByOrderByStockDesc();
    @Modifying
    @Query("UPDATE Product p SET p.discountPercentage = 0.0")
    void resetAllDiscounts();
    List<Product> findByDiscountPercentageGreaterThan(Double minDiscount);
    Long countByStockLessThan(int stockThreshold);
}
