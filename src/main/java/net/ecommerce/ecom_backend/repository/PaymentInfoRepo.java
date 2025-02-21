package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentInfoRepo extends JpaRepository<PaymentInfo, Long> {
    List<PaymentInfo> findByUserId(Long userId);
}
