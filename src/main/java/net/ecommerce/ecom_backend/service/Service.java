package net.ecommerce.ecom_backend.service;

import net.ecommerce.ecom_backend.dto.*;
import net.ecommerce.ecom_backend.entity.*;
import net.ecommerce.ecom_backend.mapper.Mapper;
import net.ecommerce.ecom_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public ProductDto createProduct(ProductDto productDto) {
        Products products = Mapper.toProducts(productDto);
        Products savedProducts = productRepo.save(products);
        return Mapper.toProductDto(savedProducts);
    }
    public ProductDto getProductById(Long id) {
        Products products = productRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        return Mapper.toProductDto(products);
    }
    public List<ProductDto> getAllProducts() {
        return productRepo.findAll().stream().map(Mapper::toProductDto).collect(Collectors.toList());
    }
    public ProductDto updateProduct(Long id,ProductDto productDto) {
        Products products = productRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        products.setName(productDto.getName());
        products.setPrice(productDto.getPrice());
        products.setDescription(productDto.getDescription());

        Products savedProducts = productRepo.save(products);
        return Mapper.toProductDto(savedProducts);
    }
    public void deleteProduct(Long id) {
        Products products = productRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        productRepo.delete(products);
    }

    //Product Dimensions Methods
    public ProductDimensionsDto getDimensionsByProductId(Long id) {
        ProductDimensions dimensions = productDimRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dimension not found"));
        return Mapper.toProductDimensionsDto(dimensions);
    }

}
