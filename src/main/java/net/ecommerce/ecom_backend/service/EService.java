package net.ecommerce.ecom_backend.service;

import lombok.RequiredArgsConstructor;
import net.ecommerce.ecom_backend.dto.*;
import net.ecommerce.ecom_backend.entity.*;
import net.ecommerce.ecom_backend.mapper.Mapper;
import net.ecommerce.ecom_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired })
public class EService {
    @Autowired
    private Mapper mapper;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private AddressRepo addressRepo;
    @Autowired
    private PaymentInfoRepo paymentInfoRepo;
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private FavoriteRepo favoriteRepo;
    @Autowired
    private CartRepo cartRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private DiscountLogRepo discountLogRepo;
    @Autowired
    private OrderDetailsRepo orderDetailsRepo;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;


    //User Methods
    public UserDto createUser(UserDto userDto) {
        if (userRepo.findByUsername(userDto.getUsername()) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }

        User user = Mapper.toUser(userDto);
        LocalDateTime now = LocalDateTime.now();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);
        user.setRole("User");
        User savedUser = userRepo.save(user);
        return Mapper.toUserDto(savedUser);
    }

    public UserDto getUserById(Long userId) {
        return userRepo.findById(userId).map(Mapper::toUserDto).orElse(null);
    }

    public UserDto LoginUser(LoginDto loginDto) {
        User user = userRepo.findByUsername(loginDto.getUsername());

        if (user != null) {
            if (user.isBlocked()) {
                throw new RuntimeException("Your account is blocked. Please contact support.");
            }
            if (user.getPassword().equals(loginDto.getPassword())) {
                return Mapper.toUserDto(user);
            }
        }

        return null;
    }

    @Transactional
    public User updateUserProfile(Long userId, UserUpdateDto userUpdateDto) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(userUpdateDto.getName());
        user.setEmail(userUpdateDto.getEmail());
        user.setPhoneNumber(userUpdateDto.getPhoneNumber());

        return userRepo.save(user);
    }
    public String updateUserPassword(Long userId, PasswordUpdateDto passwordUpdateDto) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if old password matches
        if (!passwordEncoder.matches(passwordUpdateDto.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect old password");
        }

        // Encode and update new password
        user.setPassword(passwordEncoder.encode(passwordUpdateDto.getNewPassword()));
        userRepo.save(user);

        return "Password updated successfully";
    }

//    Address Methods
    public AddressDto addAddress(AddressDto addressDto) {
        Optional<User> user = userRepo.findById(addressDto.getUserId());
        if (user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        Address address = Mapper.toAddress(addressDto);
        address.setUser(user.get());
        return Mapper.toAddressDto(addressRepo.save(address));
    }

    public List<AddressDto> getUserAddresses(Long userId) {
        return addressRepo.findByUserUserId(userId).stream().map(Mapper::toAddressDto).collect(Collectors.toList());
    }

    public AddressDto updateAddress(Long id,AddressDto addressDto) {
        return addressRepo.findById(id).map(existingAddress -> {
            existingAddress.setStreet(addressDto.getStreet());
            existingAddress.setCity(addressDto.getCity());
            existingAddress.setState(addressDto.getState());
            existingAddress.setZip(addressDto.getZip());
            existingAddress.setCountry(addressDto.getCountry());
            existingAddress.setAddressType(addressDto.getAddressType());

            return Mapper.toAddressDto(addressRepo.save(existingAddress));
        }).orElseThrow(() -> new RuntimeException("Address not found"));
    }

    public void deleteAddress(Long id) {
        if (!addressRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found");
        }
        addressRepo.deleteById(id);
    }

    //PaymentInfo Methods
    public PaymentInfoDto addPaymentInfo(PaymentInfoDto paymentInfoDto) {
        Optional<User> user = userRepo.findById(paymentInfoDto.getUserId());
        if (user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        PaymentInfo paymentInfo = Mapper.toPaymentInfo(paymentInfoDto);
        paymentInfo.setUser(user.get());
        return Mapper.toPaymentInfoDto(paymentInfoRepo.save(paymentInfo));
    }

    public void setSelectedPayment(Long userId, Long paymentId) {
        List<PaymentInfo> payments = paymentInfoRepo.findByUserUserId(userId);
        for (PaymentInfo p : payments) {
            p.setSelected(p.getPaymentId().equals(paymentId));
        }
        paymentInfoRepo.saveAll(payments);
    }

    public PaymentInfoDto getSelectedPayment(Long userId) {
        PaymentInfo payment = paymentInfoRepo.findSelectedByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No selected payment found"));
        return Mapper.toPaymentInfoDto(payment);
    }

    public List<PaymentInfoDto> getUserPaymentInfos(Long userId) {
        return paymentInfoRepo.findByUserUserId(userId).stream().map(Mapper::toPaymentInfoDto).collect(Collectors.toList());
    }

    public PaymentInfoDto updatePaymentInfo(Long paymentId, PaymentInfoDto paymentInfoDto) {
        return paymentInfoRepo.findById(paymentId).map(exsistingInfo ->{
            exsistingInfo.setCardNumber(paymentInfoDto.getCardNumber());
            exsistingInfo.setCardHolderName(paymentInfoDto.getCardHolderName());
            exsistingInfo.setExpiryDate(paymentInfoDto.getExpiryDate());
            exsistingInfo.setCvv(paymentInfoDto.getCvv());
            exsistingInfo.setCardType(paymentInfoDto.getCardType());

            return Mapper.toPaymentInfoDto(paymentInfoRepo.save(exsistingInfo));

        }).orElseThrow(() -> new RuntimeException("PaymentInfo not found"));
    }

    public void deletePaymentInfo(Long id) {
        if (!paymentInfoRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "PaymentInfo not found");
        }
        paymentInfoRepo.deleteById(id);
    }

    //Product Methods
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepo.findAll();
        return products.stream().map(Mapper::toProductDto).collect(Collectors.toList());
    }

    public ProductDto getProductById(Long id) {
        return productRepo.findById(id).map(Mapper::toProductDto).orElse(null);
    }
    public List<ProductDto> getProductsByCategory(String category) {
        List<Product> products = productRepo.findByCategory(category);
        return products.stream().map(Mapper::toProductDto).collect(Collectors.toList());
    }
    public List<String> getAllCategories() {
        return productRepo.findAllCategories();
    }

    public List<ProductDto> saveProducts(List<ProductDto> productDtos) {
        List<Product> products = productDtos.stream()
                .map(mapper::toEntity)
                .collect(Collectors.toList());

        List<Product> savedProducts = productRepo.saveAll(products);

        return savedProducts.stream()
                .map(Mapper::toProductDto)
                .collect(Collectors.toList());
    }

    public ProductDto getTrendingProduct() {
        Long trendingProductId = orderDetailsRepo.findBestSellingProductId();
        if (trendingProductId != null) {
            Product product = productRepo.findById(trendingProductId).orElse(null);
            if (product != null) {
                return Mapper.toProductDto(product);
            }
        }
        return null;
    }

    @Transactional
    public List<Product> applyDiscountToTopStockProducts() {
        List<Product> highStockProducts = productRepo.findTop10ByOrderByStockDesc();

        productRepo.resetAllDiscounts();
        List<DiscountLog> discountLogs = new ArrayList<>();
        for (Product product : highStockProducts) {
            double discount = product.getPrice() * 0.10;
            product.setDiscountPercentage(discount);

            DiscountLog log = new DiscountLog();
            log.setProductId(product.getId());
            log.setProductTitle(product.getTitle());
            log.setOriginalPrice(product.getPrice());
            log.setDiscountApplied(discount);
            log.setDiscountDate(LocalDateTime.now());

            discountLogs.add(log);
        }
        discountLogRepo.saveAll(discountLogs);
        return productRepo.saveAll(highStockProducts);
    }

    public List<ProductDto> getDiscountedProducts() {
        List<Product> discountedProducts = productRepo.findByDiscountPercentageGreaterThan(0.0);
        return discountedProducts.stream()
                .map(Mapper::toProductDto)
                .collect(Collectors.toList());
    }
    @Transactional
    public void clearAllDiscounts() {
        productRepo.resetAllDiscounts();
    }

    public List<DiscountLogDto> getDiscountHistory() {
        List<DiscountLog> logs = discountLogRepo.findAll(Sort.by(Sort.Direction.DESC, "discountDate"));
        return logs.stream()
                .map(Mapper::toDiscountLogDto)
                .collect(Collectors.toList());
    }

    public List<DiscountLogDto> getAllDiscountLogs() {
        return discountLogRepo.findAll(Sort.by(Sort.Direction.DESC, "discountDate"))
                .stream()
                .map(Mapper::toDiscountLogDto)
                .collect(Collectors.toList());
    }


    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    //Favorite Methods
    @Transactional
    public String addToFavorites(Long userId, Long productId) {
        if (favoriteRepo.existsByUserUserIdAndProductId(userId, productId)) {
            return "Product is already in favorites";
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Favorite favorite = new Favorite(user, product);
        favoriteRepo.save(favorite);

        return "Added to favorites successfully!";
    }

    @Transactional
    public void removeFromFavorites(Long userId, Long productId) {
        Optional<Favorite> favorite = favoriteRepo.findByUserUserIdAndProductId(userId, productId);
        if (favorite.isPresent()) {
            favoriteRepo.delete(favorite.get());
            System.out.println("Product successfully removed from favorites!");
        } else {
            System.out.println("Product not found in favorites!");
        }
    }

    public List<FavoriteDto> getUserFavorites(Long userId) {
        List<Favorite> favorites = favoriteRepo.findByUserUserId(userId);
        return favorites.stream().map(mapper::toFavoriteDto).collect(Collectors.toList());
    }

    //Cart Methods
    @Transactional
    public String addToCart(Long userId, Long productId, int quantity) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cartItem = cartRepo.findByUserUserIdAndProductId(userId, productId)
                .orElse(null);

        if (cartItem == null) {
            cartItem = new Cart(user, product, quantity);
            cartRepo.save(cartItem);
            return "Added to cart successfully!";
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartRepo.save(cartItem);
            return "Quantity updated in cart";
        }
    }

    @Transactional
    public CartDto updateCartQuantity(Long userId, Long productId, int quantity) {
        Cart cartItem = cartRepo.findByUserUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cartItem.setQuantity(quantity);
        cartItem = cartRepo.save(cartItem);

        return mapper.toCartDto(cartItem);
    }

    @Transactional
    public void removeFromCart(Long userId, Long productId) {
        Optional<Cart> cartItem = cartRepo.findByUserUserIdAndProductId(userId, productId);
        if (cartItem.isPresent()) {
            cartRepo.delete(cartItem.get());
            System.out.println("Product successfully removed from cart!");
        } else {
            System.out.println("Product not found in cart!");
        }
    }

    public List<CartDto> getUserCart(Long userId) {
        List<Cart> cartItems = cartRepo.findByUserUserId(userId);
        return cartItems.stream().map(mapper::toCartDto).collect(Collectors.toList());
    }

    //Order Methods
    @Transactional
    public OrderResponseDto placeOrder(OrderRequestDto orderRequestDto) {
        User user = userRepo.findById(orderRequestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Address address = addressRepo.findById(orderRequestDto.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));
        PaymentInfo paymentInfo = paymentInfoRepo.findById(orderRequestDto.getPaymentId())
                .orElseThrow(() -> new RuntimeException("Payment info not found"));
        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setPaymentInfo(paymentInfo);
        order.setTotalPrice(orderRequestDto.getTotalPrice());
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("Placed");
        final Order savedOrder = orderRepo.save(order);

        List<OrderDetails> orderDetailsList = orderRequestDto.getItems().stream().map(itemDTO -> {
            Product product = productRepo.findById(itemDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock() < itemDTO.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getTitle());
            }
            product.setStock(product.getStock() - itemDTO.getQuantity());
            productRepo.save(product);

            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setOrder(savedOrder);
            orderDetails.setProduct(product);
            orderDetails.setQuantity(itemDTO.getQuantity());
            orderDetails.setPrice(itemDTO.getPrice());

            return orderDetails;
        }).collect(Collectors.toList());

        order.setOrderDetails(orderDetailsList);
        orderRepo.save(order);
        sendOrderConfirmation(
                user.getEmail(), user.getUsername(), order.getOrderId(), order.getTotalPrice()
        );
        return Mapper.toOrderResponseDto(order);
    }

    public OrderResponseDto getOrderById(Long orderId) {
        System.out.println("Fetching order with ID: " + orderId);
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        AddressDto addressDto = new AddressDto(
                order.getAddress().getId(),
                order.getAddress().getStreet(),
                order.getAddress().getCity(),
                order.getAddress().getState(),
                order.getAddress().getZip(),
                order.getAddress().getCountry(),
                order.getAddress().getAddressType(),
                order.getUser().getUserId()
        );
        return new OrderResponseDto(
                order.getOrderId(),
                order.getUser().getUsername(),
                order.getTotalPrice(),
                order.getOrderStatus(),
                order.getOrderDate(),
                order.getOrderDetails().stream()
                        .map(details-> new OrderItemResponseDto(
                                details.getProduct().getTitle(),
                                details.getQuantity(),
                                details.getPrice()))
                        .toList(),
                addressDto
        );
    }

    public List<OrderResponseDto> getOrdersByUser(Long userId) {
        List<Order> orders = orderRepo.findByUserUserId(userId);
        return orders.stream().map(Mapper::toOrderResponseDto).collect(Collectors.toList());
    }

    public List<RevenueBreakDownDto> getRevenueByCategory() {
        List<Object[]> result = orderRepo.getRevenueByCategory();
        List<RevenueBreakDownDto> breakdowns = new ArrayList<>();
        for (Object[] row : result) {
            String categoryName = (String) row[0];
            Double revenue = (Double) row[1];
            breakdowns.add(new RevenueBreakDownDto(categoryName, revenue));
        }
        return breakdowns;
    }

    public List<OrderResponseDto> getAllOrdersWithFilters(String sortOrder, String status) {
        List<Order> orders;

        if (status != null && !status.isEmpty()) {
            orders = orderRepo.findByOrderStatus(status);
            if ("asc".equalsIgnoreCase(sortOrder)) {
                orders.sort(Comparator.comparing(Order::getOrderDate));
            } else {
                orders.sort(Comparator.comparing(Order::getOrderDate).reversed());
            }
        } else {
            Sort sort = sortOrder.equalsIgnoreCase("asc") ?
                    Sort.by("orderDate").ascending() :
                    Sort.by("orderDate").descending();
            orders = orderRepo.findAll(sort);
        }

        return orders.stream()
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
                                .toList(),
                        new AddressDto(
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
    }

    public void sendOrderConfirmation(String toEmail, String username, Long orderId, double totalPrice) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject("Order Confirmation - Order #" + orderId);
            helper.setText(
                    "Hi " + username + ",\n\n" +
                            "Thank you for your order!\n\n" +
                            "Order ID: " + orderId + "\n" +
                            "Total Price: $" + totalPrice + "\n" +
                            "We will notify you once your items are shipped.\n\n" +
                            "Regards,\nYour E-Commerce Team"
            );

            helper.setFrom(fromEmail);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send confirmation email", e);
        }
    }
}
