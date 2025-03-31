package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {
    List<Address> findByUserUserId(Long userId);
    @Query("SELECT a FROM Address a WHERE a.user.userId = :userId AND a.deleted = false")
    List<Address> findActiveByUserUserId(@Param("userId") Long userId);
    @Query("SELECT a FROM Address a WHERE a.deleted = false")
    List<Address> findActiveAddresses();
}
