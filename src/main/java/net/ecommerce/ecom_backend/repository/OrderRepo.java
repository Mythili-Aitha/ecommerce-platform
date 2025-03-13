package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByUserUserId(Long userId);
    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    Double getTotalRevenue();
    List<Order> findTop5ByOrderByOrderDateDesc();

}
