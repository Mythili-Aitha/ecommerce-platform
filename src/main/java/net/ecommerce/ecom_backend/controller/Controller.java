package net.ecommerce.ecom_backend.controller;

import net.ecommerce.ecom_backend.dto.*;
import net.ecommerce.ecom_backend.entity.User;
import net.ecommerce.ecom_backend.repository.UserRepo;
import net.ecommerce.ecom_backend.service.EService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class Controller {
    @Autowired
    private EService service;


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
    @PutMapping("/users/{userId}/profile")
    public ResponseEntity<User> updateProfile(
            @PathVariable Long userId,
            @RequestBody UserUpdateDto userUpdateDto) {
        User updatedUser = service.updateUserProfile(userId, userUpdateDto);
        return ResponseEntity.ok(updatedUser);
    }
    @PutMapping("/users/{userId}/password")
    public ResponseEntity<String> updatePassword(
            @PathVariable Long userId,
            @RequestBody PasswordUpdateDto passwordUpdateDto) {
        String message = service.updateUserPassword(userId, passwordUpdateDto);
        return ResponseEntity.ok(message);
    }

    //ADDRESS API CALLS
    @PostMapping("/address")
    public ResponseEntity<AddressDto> addAddress(@RequestBody AddressDto addressDto) {
        return ResponseEntity.ok(service.addAddress(addressDto));
    }

    @GetMapping("/address/users/{userId}")
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

    @GetMapping("/payments/users/{userId}")
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

    //PRODUCT API CALLS
    @GetMapping("/products")
    public List<ProductDto> getAllProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public ProductDto getProductById(@PathVariable Long id) {
        return service.getProductById(id);
    }

//    @PostMapping("/products")
//    public ProductDto addProduct(@RequestBody ProductDto productDto) {
//        return service.saveProduct(productDto);
//    }
    @PostMapping("/products/bulk")
    public List<ProductDto> addProducts(@RequestBody List<ProductDto> productDtos) {
        return service.saveProducts(productDtos);
    }


    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
    }

    //FAVORITE API CALLS
    @PostMapping("/favorites/add")
    public ResponseEntity<String> addToFavorites(@RequestParam Long userId, @RequestParam Long productId) {
        String response = service.addToFavorites(userId, productId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/favorites/remove")
    public ResponseEntity<String> removeFromFavorites(@RequestParam Long userId, @RequestParam Long productId) {
        service.removeFromFavorites(userId, productId);
        return ResponseEntity.ok("Product removed from favorites");
    }

    @GetMapping("/favorites/users/{userId}")
    public ResponseEntity<List<FavoriteDto>> getUserFavorites(@PathVariable Long userId) {
        List<FavoriteDto> favorites = service.getUserFavorites(userId);
        return ResponseEntity.ok(favorites);
    }

    //CART API CALLS
    @PostMapping("/cart/add")
    public ResponseEntity<String> addToCart(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam int quantity) {

        String response = service.addToCart(userId, productId, quantity);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/cart/update")
    public ResponseEntity<CartDto> updateCartQuantity(@RequestParam Long userId,
                                                      @RequestParam Long productId,
                                                      @RequestParam int quantity) {
        CartDto updatedCart = service.updateCartQuantity(userId, productId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/cart/remove")
    public ResponseEntity<String> removeFromCart(@RequestParam Long userId, @RequestParam Long productId) {
        service.removeFromCart(userId, productId);
        return ResponseEntity.ok("Product removed from cart");
    }

    @GetMapping("/cart/users/{userId}")
    public ResponseEntity<List<CartDto>> getUserCart(@PathVariable Long userId) {
        List<CartDto> cartItems = service.getUserCart(userId);
        return ResponseEntity.ok(cartItems);
    }

    //ORDER API CALLS
    @PostMapping("/orders/place")
    public ResponseEntity<OrderResponseDto> placeOrder(@RequestBody OrderRequestDto orderRequestDTO) {
        OrderResponseDto orderResponse = service.placeOrder(orderRequestDTO);
        return ResponseEntity.ok(orderResponse);
    }

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<OrderResponseDto> getOrderDetails(@PathVariable Long orderId) {
        OrderResponseDto orderResponse = service.getOrderById(orderId);
        return ResponseEntity.ok(orderResponse);
    }

    @GetMapping("/orders/users/{userId}")
    public ResponseEntity<List<OrderResponseDto>> getUserOrders(@PathVariable Long userId) {
        List<OrderResponseDto> userOrders = service.getOrdersByUser(userId);
        return ResponseEntity.ok(userOrders);
    }

}
