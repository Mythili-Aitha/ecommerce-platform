package net.ecommerce.ecom_backend.service;

import net.ecommerce.ecom_backend.dto.*;
import net.ecommerce.ecom_backend.entity.*;
import net.ecommerce.ecom_backend.mapper.Mapper;
import net.ecommerce.ecom_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
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


    //User Methods
    public UserDto createUser(UserDto userDto) {
        if (userRepo.findByUsername(userDto.getUsername()) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }

        User user = Mapper.toUser(userDto);
        LocalDateTime now = LocalDateTime.now();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);
        User savedUser = userRepo.save(user);
        return Mapper.toUserDto(savedUser);
    }

    public UserDto getUserById(Long userId) {
        return userRepo.findById(userId).map(Mapper::toUserDto).orElse(null);
    }

    public UserDto LoginUser(LoginDto loginDto) {
        User user = userRepo.findByUsername(loginDto.getUsername());

        if (user != null && user.getPassword().equals(loginDto.getPassword())) {
            return Mapper.toUserDto(user); // Return user details without password
        }

        return null;
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

    public List<ProductDto> saveProducts(List<ProductDto> productDtos) {
        List<Product> products = productDtos.stream()
                .map(mapper::toEntity)
                .collect(Collectors.toList());

        List<Product> savedProducts = productRepo.saveAll(products);

        return savedProducts.stream()
                .map(Mapper::toProductDto)
                .collect(Collectors.toList());
    }


    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }

    //Favorite Methods
    @Transactional
    public FavoriteDto addToFavorites(Long userId, Long productId) {
        if (favoriteRepo.existsByUserUserIdAndProductId(userId, productId)) {
            throw new RuntimeException("Product is already in favorites");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Favorite favorite = new Favorite(user, product);
        favorite = favoriteRepo.save(favorite);

        return mapper.toFavoriteDto(favorite);
    }

    @Transactional
    public void removeFromFavorites(Long userId, Long productId) {
        if (!favoriteRepo.existsByUserUserIdAndProductId(userId, productId)) {
            throw new RuntimeException("Product is not in favorites");
        }

        favoriteRepo.deleteByUserUserIdAndProductId(userId, productId);
    }

    public List<FavoriteDto> getUserFavorites(Long userId) {
        List<Favorite> favorites = favoriteRepo.findByUserUserId(userId);
        return favorites.stream().map(mapper::toFavoriteDto).collect(Collectors.toList());
    }

    //Cart Methods
    @Transactional
    public CartDto addToCart(Long userId, Long productId, int quantity) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cartItem = cartRepo.findByUserUserIdAndProductId(userId, productId)
                .orElse(null);

        if (cartItem == null) {
            cartItem = new Cart(user, product, quantity);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }

        cartItem = cartRepo.save(cartItem);
        return mapper.toCartDto(cartItem);
    }

    @Transactional
    public CartDto updateCartQuantity(Long userId, Long productId, int quantity) {
        Cart cartItem = cartRepo.findByUserUserIdAndProductId(userId, productId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cartItem.setQuantity(quantity);
        cartRepo.save(cartItem);

        return mapper.toCartDto(cartItem);
    }

    @Transactional
    public void removeFromCart(Long userId, Long productId) {
        if (!cartRepo.existsByUserUserIdAndProductId(userId, productId)) {
            throw new RuntimeException("Product is not in cart");
        }

        cartRepo.deleteByUserUserIdAndProductId(userId, productId);
    }

    public List<CartDto> getUserCart(Long userId) {
        List<Cart> cartItems = cartRepo.findByUserUserId(userId);
        return cartItems.stream().map(mapper::toCartDto).collect(Collectors.toList());
    }

}
