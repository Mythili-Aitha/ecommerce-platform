package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.Order;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.user.userId = :userId")
    List<Order> findByUserUserId(Long userId);
    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    Double getTotalRevenue();
    @Query("SELECT o.orderStatus, SUM(o.totalPrice) FROM Order o GROUP BY o.orderStatus")
    List<Object[]> getRevenueByStatus();
    @Query("SELECT p.category, SUM(od.quantity * od.price) FROM Order o " +
            "JOIN o.orderDetails od " +
            "JOIN od.product p " +
            "WHERE o.orderStatus in ('SHIPPED', 'DELIVERED')" +
            "GROUP BY p.category")
    List<Object[]> getRevenueByCategory();
    @Query("SELECT o FROM Order o WHERE o.orderStatus = :status ORDER BY o.orderDate DESC")
    List<Order> findByOrderStatus(@Param("status") String status);
    List<Order> findTop5ByOrderByOrderDateDesc();
    @Query("SELECT o FROM Order o WHERE o.address.id = :addressId")
    List<Order> findByAddressId(@Param("addressId") Long addressId);

}
