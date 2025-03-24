package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.DiscountLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountLogRepo extends JpaRepository<DiscountLog, Long> {
}
