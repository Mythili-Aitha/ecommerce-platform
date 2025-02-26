package net.ecommerce.ecom_backend.controller;

import net.ecommerce.ecom_backend.dto.*;
import net.ecommerce.ecom_backend.repository.UserRepo;
import net.ecommerce.ecom_backend.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/users/{userId}")
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

    //PRODUCTS API CALLS
    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }
    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getProductById(id));
    }
    @PostMapping("/products")
    public ResponseEntity<List<ProductDto>> createProducts(@RequestBody List<ProductDto> productDtos) {
        try {
            List<ProductDto> savedProducts = service.createProduct(productDtos);
            return ResponseEntity.ok(savedProducts);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PostMapping("/products/bulk-upload")
    public ResponseEntity<List<ProductDto>> uploadProducts(@RequestBody List<ProductDto> productDtos) {
        System.out.println("Received JSON: " + productDtos);
        List<ProductDto> savedProducts = service.saveAllProducts(productDtos);
        return ResponseEntity.ok(savedProducts);
    }
    @PutMapping("/products/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
        productDto.setId(id);
        ProductDto savedProduct = service.updateProduct(id, productDto);
        return ResponseEntity.ok(savedProduct);
    }
    @DeleteMapping("/process/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    //REVIEWS API CALLS
    @GetMapping("/products_reviews")
    public ResponseEntity<List<ProductReviewDto>> getAllProductReviews() {
        return ResponseEntity.ok(service.getAllProductReviews());
    }
    @PostMapping("/products_reviews")
    public ResponseEntity<ProductReviewDto> createProductReview(@RequestBody ProductReviewDto productReviewDto) {
        ProductReviewDto savedProductReview = service.createProductReview(productReviewDto);
        return ResponseEntity.ok(savedProductReview);
    }

}
