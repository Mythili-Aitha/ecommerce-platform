package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentInfoRepo extends JpaRepository<PaymentInfo, Long> {
    List<PaymentInfo> findByUserUserId(Long userId);
    @Query("SELECT p FROM PaymentInfo p WHERE p.user.userId = :userId AND p.selected = true")
    Optional<PaymentInfo> findSelectedByUserId(@Param("userId") Long userId);
}
