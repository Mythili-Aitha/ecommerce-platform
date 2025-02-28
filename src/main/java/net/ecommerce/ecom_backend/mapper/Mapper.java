package net.ecommerce.ecom_backend.mapper;

import net.ecommerce.ecom_backend.dto.*;
import net.ecommerce.ecom_backend.entity.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class Mapper {
    public static UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());
        return userDto;

    }

    public static User toUser(UserDto userDto) {
        if (userDto == null) {
            return null;
        }
        User user = new User();
        user.setUserId(userDto.getUserId());
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setEmail(userDto.getEmail());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setCreatedAt(userDto.getCreatedAt());
        user.setUpdatedAt(userDto.getUpdatedAt());
        return user;
    }

    public static AddressDto toAddressDto(Address address) {
        if (address == null) {
            return null;
        }
        AddressDto addressDto = new AddressDto();
        addressDto.setId(address.getId());
        addressDto.setStreet(address.getStreet());
        addressDto.setCity(address.getCity());
        addressDto.setState(address.getState());
        addressDto.setZip(address.getZip());
        addressDto.setCountry(address.getCountry());
        addressDto.setAddressType(address.getAddressType());
        addressDto.setUserId(address.getUser().getUserId());
        return addressDto;
    }

    public static Address toAddress(AddressDto addressDto) {
        if (addressDto == null) {
            return null;
        }
        Address address = new Address();
        address.setId(addressDto.getId());
        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZip(addressDto.getZip());
        address.setCountry(addressDto.getCountry());
        address.setAddressType(addressDto.getAddressType());
        return address;
    }

    public static PaymentInfoDto toPaymentInfoDto(PaymentInfo paymentInfo) {
        if (paymentInfo == null) {
            return null;
        }
        PaymentInfoDto paymentInfoDto = new PaymentInfoDto();
        paymentInfoDto.setPaymentId(paymentInfo.getPaymentId());
        paymentInfoDto.setCardNumber(paymentInfo.getCardNumber());
        paymentInfoDto.setCardHolderName(paymentInfo.getCardHolderName());
        paymentInfoDto.setExpiryDate(paymentInfo.getExpiryDate());
        paymentInfoDto.setCvv(paymentInfo.getCvv());
        paymentInfoDto.setCardType(paymentInfo.getCardType());
        paymentInfoDto.setUserId(paymentInfo.getUser().getUserId());
        return paymentInfoDto;
    }

    public static PaymentInfo toPaymentInfo(PaymentInfoDto paymentInfoDto) {
        if (paymentInfoDto == null) {
            return null;
        }
        PaymentInfo paymentInfo = new PaymentInfo();
        paymentInfo.setPaymentId(paymentInfoDto.getPaymentId());
        paymentInfo.setCardNumber(paymentInfoDto.getCardNumber());
        paymentInfo.setCardHolderName(paymentInfoDto.getCardHolderName());
        paymentInfo.setExpiryDate(paymentInfoDto.getExpiryDate());
        paymentInfo.setCvv(paymentInfoDto.getCvv());
        paymentInfo.setCardType(paymentInfoDto.getCardType());
        return paymentInfo;
    }
    public static ProductDto toProductDto(Product product) {
        if (product == null) {
            return null;
        }
        return new ProductDto(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getCategory(),
                product.getPrice(),
                product.getRating(),
                product.getStock(),
                product.getBrand(),
                product.getSku(),
                product.getTags(),
                product.getDimensions() != null ? new DimensionsDto(
                        product.getDimensions().getWidth(),
                        product.getDimensions().getHeight(),
                        product.getDimensions().getDepth()
                ) : null,
                product.getReviews() != null ? product.getReviews().stream()
                        .map(review -> new ReviewDto(
                                review.getRating(),
                                review.getComment(),
                                review.getDate(),
                                review.getReviewerName(),
                                review.getReviewerEmail()
                        )).collect(Collectors.toList()) : null,
                product.getMeta() != null ? new MetaDto(
                        product.getMeta().getCreatedAt(),
                        product.getMeta().getUpdatedAt(),
                        product.getMeta().getBarcode(),
                        product.getMeta().getQrCode()
                ) : null,
                product.getImages(),
                product.getThumbnail()
        );
    }

    public Product toEntity(ProductDto productDto) {
        if (productDto == null) {
            return null;
        }
        Product product = new Product();
        product.setId(productDto.getId());
        product.setTitle(productDto.getTitle());
        product.setDescription(productDto.getDescription());
        product.setCategory(productDto.getCategory());
        product.setPrice(productDto.getPrice());
        product.setRating(productDto.getRating());
        product.setStock(productDto.getStock());
        product.setBrand(productDto.getBrand());
        product.setSku(productDto.getSku());
        product.setTags(productDto.getTags());

        if (productDto.getDimensions() != null) {
            product.setDimensions(new Dimensions(
                    productDto.getDimensions().getWidth(),
                    productDto.getDimensions().getHeight(),
                    productDto.getDimensions().getDepth()
            ));
        }

        if (productDto.getReviews() != null) {
            List<Review> reviews = productDto.getReviews().stream()
                    .map(reviewDto -> new Review(
                            null,
                            reviewDto.getRating(),
                            reviewDto.getComment(),
                            reviewDto.getDate(),
                            reviewDto.getReviewerName(),
                            reviewDto.getReviewerEmail(),
                            product
                    )).collect(Collectors.toList());
            product.setReviews(reviews);
        }

        if (productDto.getMeta() != null) {
            product.setMeta(new Meta(
                    productDto.getMeta().getCreatedAt(),
                    productDto.getMeta().getUpdatedAt(),
                    productDto.getMeta().getBarcode(),
                    productDto.getMeta().getQrCode()
            ));
        }

        product.setImages(productDto.getImages());
        product.setThumbnail(productDto.getThumbnail());

        return product;
    }

    public FavoriteDto toFavoriteDto(Favorite favorite) {
        if (favorite == null) {
            return null;
        }
        return new FavoriteDto(
                favorite.getId(),
                favorite.getUser().getUserId(),
                favorite.getProduct().getId(),
                favorite.getProduct().getTitle(),   // Assuming Product has a name field
                favorite.getProduct().getImages().isEmpty() ? null : favorite.getProduct().getImages().get(0) // Assuming Product has an image field
        );
    }
    public Favorite toFavorite(FavoriteDto dto, User user, Product product) {
        if (dto == null) {
            return null;
        }
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setProduct(product);
        return favorite;

    }

    public CartDto toCartDto(Cart cart) {
        if (cart == null) {
            return null;
        }
        return new CartDto(
                cart.getId(),
                cart.getUser().getUserId(),
                cart.getProduct().getId(),
                cart.getProduct().getTitle(),
                cart.getProduct().getImages().isEmpty() ? null : cart.getProduct().getImages().get(0),
                cart.getProduct().getPrice(),
                cart.getQuantity()
        );
    }

    public Cart toCart(CartDto cartDto, User user, Product product) {
        if (cartDto == null) {
            return null;
        }
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(cartDto.getQuantity());
        return cart;

    }

    public static OrderResponseDto toOrderResponseDto(Order order) {
        if (order == null) {
            return null;
        }
        OrderResponseDto dto = new OrderResponseDto();
        dto.setOrderId(order.getOrderId());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setOrderDate(order.getOrderDate());

        List<OrderItemResponseDto> items = order.getOrderDetails().stream().map(Mapper::toOrderItemResponseDto).collect(Collectors.toList());
        dto.setItems(items);
        return dto;
    }

    private static OrderItemResponseDto toOrderItemResponseDto(OrderDetails orderDetails) {
        OrderItemResponseDto dto = new OrderItemResponseDto();
        dto.setProductName(orderDetails.getProduct().getTitle());
        dto.setQuantity(orderDetails.getQuantity());
        dto.setPrice(orderDetails.getPrice());
        return dto;
    }

}
