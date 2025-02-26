package net.ecommerce.ecom_backend.service;

import jakarta.persistence.EntityNotFoundException;
import net.ecommerce.ecom_backend.dto.*;
import net.ecommerce.ecom_backend.entity.*;
import net.ecommerce.ecom_backend.mapper.Mapper;
import net.ecommerce.ecom_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@org.springframework.stereotype.Service
public class Service {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private AddressRepo addressRepo;
    @Autowired
    private PaymentInfoRepo paymentInfoRepo;
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private ProductDimRepo productDimRepo;
    @Autowired
    private ProductReviewRepo productReviewRepo;

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
    @Transactional
    public List<ProductDto> createProduct(List<ProductDto> productDtos) {
        List<ProductDto> savedProducts = new ArrayList<>();
        for (ProductDto dto : productDtos) {
            Products product;
            if (dto.getId() != null && productRepo.existsById(dto.getId())) {
                product = productRepo.findById(dto.getId()).orElseThrow(() ->
                        new EntityNotFoundException("Product not found"));
            } else {
                product = new Products();
            }

            // Set fields
            product.setTitle(dto.getTitle());
            product.setDescription(dto.getDescription());
            product.setPrice(dto.getPrice());
            product.setBrand(dto.getBrand());
            product.setSku(dto.getSku());
            product.setRating(dto.getRating());
            product.setStock(dto.getStock());
            product.setCategory(dto.getCategory());

            Products savedProduct = productRepo.save(product);
            savedProducts.add(Mapper.toProductDto(savedProduct));
        }
        return savedProducts;
    }

    public ProductDto getProductById(Long id) {
        Products products = productRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        return Mapper.toProductDto(products);
    }
    public List<ProductDto> getAllProducts() {
        return productRepo.findAll().stream().map(Mapper::toProductDto).collect(Collectors.toList());
    }
    @Transactional
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Products product = productRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        product.setTitle(productDto.getTitle());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());

        Products updatedProduct = productRepo.save(product);
        return Mapper.toProductDto(updatedProduct);
    }
    @Transactional
    public List<ProductDto> saveAllProducts(List<ProductDto> productDtos) {
        List<Products> newProducts = new ArrayList<>();
        List<Products> existingProducts = new ArrayList<>();

        for (ProductDto dto : productDtos) {
            if (dto.getId() != null && productRepo.existsById(dto.getId())) {
                Products existingProduct = productRepo.findById(dto.getId()).orElseThrow();
                existingProduct.setTitle(dto.getTitle());
                existingProduct.setPrice(dto.getPrice());
                existingProduct.setDescription(dto.getDescription());
                existingProducts.add(existingProduct);
            } else {
                newProducts.add(Mapper.toProducts(dto));
            }
        }

        productRepo.saveAll(newProducts);
        productRepo.saveAll(existingProducts);

        List<ProductDto> savedDtos = Stream.concat(
                newProducts.stream().map(Mapper::toProductDto),
                existingProducts.stream().map(Mapper::toProductDto)
        ).collect(Collectors.toList());

        return savedDtos;
    }
    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
        }
        productRepo.deleteById(id);
    }

    //Review Methods
    public ProductReviewDto createProductReview(ProductReviewDto productReviewDto) {
        ProductReview productReview = Mapper.toProductReview(productReviewDto);
        ProductReview saveReview = productReviewRepo.save(productReview);
        return Mapper.toProductReviewDto(saveReview);
    }
    public ProductReviewDto getProductReviewById(Long id) {
        ProductReview productReview = productReviewRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product review not found"));
        return Mapper.toProductReviewDto(productReview);
    }
    public List<ProductReviewDto> getAllProductReviews() {
        return productReviewRepo.findAll().stream().map(Mapper::toProductReviewDto).collect(Collectors.toList());
    }
    public ProductReviewDto updateProductReview(ProductReviewDto productReviewDto) {
        ProductReview productReview = Mapper.toProductReview(productReviewDto);
        ProductReview savedProductReview = productReviewRepo.save(productReview);
        return Mapper.toProductReviewDto(savedProductReview);
    }
    public void deleteProductReview(Long id) {
        ProductReview productReview = productReviewRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product review not found"));
        productReviewRepo.delete(productReview);

    }

    //Product Dimensions Methods
    public ProductDimensionsDto getDimensionsByProductId(Long id) {
        ProductDimensions dimensions = productDimRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dimension not found"));
        return Mapper.toProductDimensionsDto(dimensions);
    }

}
