package net.ecommerce.ecom_backend.conroller;

import net.ecommerce.ecom_backend.dto.AddressDto;
import net.ecommerce.ecom_backend.dto.LoginDto;
import net.ecommerce.ecom_backend.dto.PaymentInfoDto;
import net.ecommerce.ecom_backend.dto.UserDto;
import net.ecommerce.ecom_backend.entity.User;
import net.ecommerce.ecom_backend.mapper.Mapper;
import net.ecommerce.ecom_backend.repository.UserRepo;
import net.ecommerce.ecom_backend.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class Controller {
    @Autowired
    private Service service;
    @Autowired
    private UserRepo userRepo;

    //USER API CALLS
    @PostMapping("/users/register")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(service.createUser(userDto));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getUserById(userId));
    }

    @PostMapping("/users/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody LoginDto loginDto) {
        UserDto userDto = service.LoginUser(loginDto);
        return userDto != null ? ResponseEntity.ok(userDto) : ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    //ADDRESS API CALLS
    @PostMapping("/address")
    public ResponseEntity<AddressDto> addAddress(@RequestBody AddressDto addressDto) {
        return ResponseEntity.ok(service.addAddress(addressDto));
    }

    @GetMapping("/address/user/{userId}")
    public ResponseEntity<List<AddressDto>> getUserAddresses(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getUserAddresses(userId));
    }

    @PutMapping("/address/{id}")
    public ResponseEntity<AddressDto> updateAddress(@PathVariable Long id, @RequestBody AddressDto addressDto) {
        return ResponseEntity.ok(service.updateAddress(id, addressDto));
    }

    @DeleteMapping("/address/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        service.deleteAddress(id);
        return ResponseEntity.noContent().build();
    }
    //PAYMENTS API CALLS
    @PostMapping("/payments")
    public ResponseEntity<PaymentInfoDto> addPaymentInfo(@RequestBody PaymentInfoDto paymentInfoDto) {
        return ResponseEntity.ok(service.addPaymentInfo(paymentInfoDto));
    }

    @GetMapping("/payments/user/{userId}")
    public ResponseEntity<List<PaymentInfoDto>> getUserPaymentInfos(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getUserPaymentInfos(userId));
    }

    @PutMapping("/payments/{id}")
    public ResponseEntity<PaymentInfoDto> updatePaymentInfo(@PathVariable Long id, @RequestBody PaymentInfoDto paymentInfoDto) {
        return ResponseEntity.ok(service.updatePaymentInfo(id, paymentInfoDto));
    }

    @DeleteMapping("/payments/{id}")
    public ResponseEntity<Void> deletePaymentInfo(@PathVariable Long id) {
        service.deletePaymentInfo(id);
        return ResponseEntity.noContent().build();
    }

}
