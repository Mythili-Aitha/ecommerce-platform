package net.ecommerce.ecom_backend.repository;

import net.ecommerce.ecom_backend.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {
    List<Address> findByUserUserId(Long userId);
}
