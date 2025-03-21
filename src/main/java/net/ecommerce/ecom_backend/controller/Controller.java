package net.ecommerce.ecom_backend.controller;

import net.ecommerce.ecom_backend.dto.*;
import net.ecommerce.ecom_backend.entity.Order;
import net.ecommerce.ecom_backend.entity.Product;
import net.ecommerce.ecom_backend.entity.User;
import net.ecommerce.ecom_backend.repository.OrderRepo;
import net.ecommerce.ecom_backend.repository.ProductRepo;
import net.ecommerce.ecom_backend.repository.UserRepo;
import net.ecommerce.ecom_backend.service.EService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class Controller {
    @Autowired
    private EService service;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ProductRepo productRepo;


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

    @PutMapping("/payments/select/{userId}/{paymentId}")
    public ResponseEntity<Void> selectPaymentMethod(@PathVariable Long userId, @PathVariable Long paymentId) {
        service.setSelectedPayment(userId, paymentId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/payments/selected/{userId}")
    public ResponseEntity<PaymentInfoDto> getSelectedPayment(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getSelectedPayment(userId));
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

    @PostMapping("/products/bulk")
    public List<ProductDto> addProducts(@RequestBody List<ProductDto> productDtos) {
        return service.saveProducts(productDtos);
    }

    @GetMapping("/products/category/{category}")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable String category) {
        List<ProductDto> products = service.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/category")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = service.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/products/trending")
    public ResponseEntity<ProductDto> getTrendingProduct() {
        ProductDto trendingProduct = service.getTrendingProduct();
        return trendingProduct != null ? ResponseEntity.ok(trendingProduct) : ResponseEntity.noContent().build();
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

    @GetMapping("/revenue/breakdown")
    public ResponseEntity<List<RevenueBreakDownDto>> getRevenueByCategory() {
        List<RevenueBreakDownDto> breakdown = service.getRevenueByCategory();
        return ResponseEntity.ok(breakdown);
    }

    @GetMapping("/orders/admin")
    public ResponseEntity<List<OrderResponseDto>> getAllOrders(
            @RequestParam(defaultValue = "desc") String sortOrder,
            @RequestParam(required = false) String status) {

        List<OrderResponseDto> orders = service.getAllOrdersWithFilters(sortOrder, status);
        return ResponseEntity.ok(orders);
    }


    //ADMIN API CALLS
    @GetMapping("/admin/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrders", orderRepo.count());
        stats.put("totalRevenue", orderRepo.getTotalRevenue());
        stats.put("totalCustomers", userRepo.countByRole("User"));
        stats.put("lowStockItems", productRepo.countByStockLessThan(5));
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/admin/recent")
    public ResponseEntity<List<OrderResponseDto>> getRecentOrders() {
        List<Order> recentOrders = orderRepo.findTop5ByOrderByOrderDateDesc();
        List<OrderResponseDto> orderDtos = recentOrders.stream()
                .map(order -> new OrderResponseDto(
                        order.getOrderId(),
                        order.getUser().getUsername(),
                        order.getTotalPrice(),
                        order.getOrderStatus(),
                        order.getOrderDate(),
                        order.getOrderDetails().stream()
                                .map(details -> new OrderItemResponseDto(
                                        details.getProduct().getTitle(),
                                        details.getQuantity(),
                                        details.getPrice()))
                                .toList(),new AddressDto(
                        order.getAddress().getId(),
                        order.getAddress().getStreet(),
                        order.getAddress().getCity(),
                        order.getAddress().getState(),
                        order.getAddress().getZip(),
                        order.getAddress().getCountry(),
                        order.getAddress().getAddressType(),
                        order.getUser().getUserId()
                )
                ))
                .toList();

        return ResponseEntity.ok(orderDtos);
    }

    @PutMapping("/admin/orders/{orderId}/status")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> request) {
        String newStatus = request.get("status");

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        order.setOrderStatus(newStatus);
        orderRepo.save(order);

        return ResponseEntity.ok("Order status updated to " + newStatus);
    }

    @DeleteMapping("/admin/orders/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        orderRepo.delete(order);
        return ResponseEntity.ok("Order deleted successfully");
    }

    @PutMapping("/admin/users/{userId}/role")
    public ResponseEntity<String> updateUserRole(@PathVariable Long userId, @RequestBody Map<String, String> request) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        String newRole = request.get("role");
        user.setRole(newRole);
        userRepo.save(user);

        return ResponseEntity.ok("User role updated to " + newRole);
    }

    @PreAuthorize("hasAuthority('Admin')")
    @GetMapping("/admin/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userRepo.findAll();
        List<UserDto> userDtos = users.stream()
                .map(user -> {
                    UserDto dto = new UserDto();
                    dto.setUserId(user.getUserId());
                    dto.setName(user.getName());
                    dto.setUsername(user.getUsername());
                    dto.setPassword(user.getPassword());
                    dto.setEmail(user.getEmail());
                    dto.setPhoneNumber(user.getPhoneNumber());
                    dto.setCreatedAt(user.getCreatedAt());
                    dto.setUpdatedAt(user.getUpdatedAt());
                    dto.setRole(user.getRole());
                    dto.setBlocked(user.isBlocked());
                    return dto;
                })
                .toList();

        return ResponseEntity.ok(userDtos);
    }

    @PreAuthorize("hasAuthority('Admin')")
    @GetMapping("/admin/users/{id}")
    public ResponseEntity<UserDto> getAdminUserById(@PathVariable Long id) {
        Optional<User> userOptional = userRepo.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            UserDto dto = new UserDto();
            dto.setUserId(user.getUserId());
            dto.setName(user.getName());
            dto.setUsername(user.getUsername());
            dto.setPassword(user.getPassword());
            dto.setEmail(user.getEmail());
            dto.setPhoneNumber(user.getPhoneNumber());
            dto.setCreatedAt(user.getCreatedAt());
            dto.setUpdatedAt(user.getUpdatedAt());
            dto.setRole(user.getRole());
            dto.setBlocked(user.isBlocked());
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }

    @PreAuthorize("hasAuthority('Admin')")
    @PutMapping("/admin/users/{id}/block")
    public ResponseEntity<String> blockOrUnblockUser(@PathVariable Long id) {
        Optional<User> userOptional = userRepo.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            boolean newBlockedStatus = !user.isBlocked();
            user.setBlocked(newBlockedStatus);
            userRepo.save(user);
            return ResponseEntity.ok(user.isBlocked() ? "User blocked successfully" : "User unblocked successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @PreAuthorize("hasAuthority('Admin')")
    @GetMapping("/admin/products")
    public List<ProductDto> getAllAdminProducts() {
        return service.getAllProducts();
    }

    @PreAuthorize("hasAuthority('Admin')")
    @GetMapping("/admin/products/{id}")
    public ProductDto getAdminProductById(@PathVariable Long id) {
        return service.getProductById(id);
    }

    @PreAuthorize("hasAuthority('Admin')")
    @PostMapping("/admin/products")
    public List<ProductDto> saveProducts(@RequestBody List<ProductDto> productDtos) {
        return service.saveProducts(productDtos);
    }

    @PreAuthorize("hasAuthority('Admin')")
    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<Void> deleteAdminProduct(@PathVariable Long id) {
        service.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }


}
