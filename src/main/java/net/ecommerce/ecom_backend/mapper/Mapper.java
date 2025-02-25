package net.ecommerce.ecom_backend.mapper;

import net.ecommerce.ecom_backend.dto.*;
import net.ecommerce.ecom_backend.entity.*;

import java.util.List;
import java.util.stream.Collectors;

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

    public static ProductDto toProductDto(Products products) {
        if (products == null) {
            return null;
        }
        ProductDto productDto = new ProductDto();
        productDto.setId(products.getId());
        productDto.setName(products.getName());
        productDto.setDescription(products.getDescription());
        productDto.setPrice(products.getPrice());
        productDto.setBrand(products.getBrand());
        productDto.setSku(products.getSku());
        productDto.setRating(products.getRating());
        productDto.setImages(products.getImages());
        productDto.setStockQuantity(products.getStockQuantity());
        productDto.setTags(products.getTags());
        productDto.setThumbnail(products.getThumbnail());
        if (products.getCategory() != null) {
            productDto.setCategory(toCategoryDto(products.getCategory()));
        }
        if (products.getDimensions() != null) {
            productDto.setDimensions(toProductDimensionsDto(products.getDimensions()));
        }
        if (products.getMeta() != null) {
            productDto.setMeta(toProductMetaDto(products.getMeta()));
        }
        if (products.getReviews() != null) {
            productDto.setReviews(products.getReviews().stream()
                    .map(Mapper::toProductReviewDto)
                    .collect(Collectors.toList()));
        }

        return productDto;
    }

    public static Products toProducts(ProductDto productDto) {
        if (productDto == null) {
            return null;
        }
        Products products = new Products();
        products.setId(productDto.getId());
        products.setName(productDto.getName());
        products.setDescription(productDto.getDescription());
        products.setPrice(productDto.getPrice());
        products.setBrand(productDto.getBrand());
        products.setSku(productDto.getSku());
        products.setRating(productDto.getRating());
        products.setImages(productDto.getImages());
        products.setStockQuantity(productDto.getStockQuantity());
        products.setTags(productDto.getTags());
        products.setThumbnail(productDto.getThumbnail());
        products.setCategory(toCategory(productDto.getCategory()));
        products.setMeta(toProductMeta(productDto.getMeta()));
        ProductDimensions dimensions = toProductDimensions(productDto.getDimensions());
        if (dimensions != null) {
            dimensions.setProducts(products); // Set reference back to Product
            products.setDimensions(dimensions);
        }
        if (productDto.getReviews() != null) {
            List<ProductReview> reviews = productDto.getReviews().stream()
                    .map(reviewDto -> {
                        ProductReview review = toProductReview(reviewDto);
                        review.setProducts(products); // Set reference back to Product
                        return review;
                    })
                    .collect(Collectors.toList());
            products.setReviews(reviews);
        }

        return products;
    }
    public static CategoryDto toCategoryDto(Category category) {
        if (category == null) {
            return null;
        }
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        categoryDto.setDescription(category.getDescription());
        return categoryDto;
    }
    public static Category toCategory(CategoryDto categoryDto) {
        if (categoryDto == null) {
            return null;
        }
        Category category = new Category();
        category.setId(categoryDto.getId());
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        return category;
    }
    public static ProductDimensionsDto toProductDimensionsDto(ProductDimensions dimensions) {
        return new ProductDimensionsDto(dimensions.getHeight(), dimensions.getWidth(), dimensions.getDepth());
    }

    public static ProductDimensions toProductDimensions(ProductDimensionsDto dimensionsDto) {
        if (dimensionsDto == null) {
            return null;
        }
        ProductDimensions productDimensions = new ProductDimensions();
        productDimensions.setHeight(dimensionsDto.getHeight());
        productDimensions.setWidth(dimensionsDto.getWidth());
        productDimensions.setDepth(dimensionsDto.getDepth());
        return productDimensions;
    }
    public static ProductMetaDto toProductMetaDto(ProductMeta meta) {
        ProductMetaDto dto = new ProductMetaDto();
        dto.setBarcode(meta.getBarcode());
        dto.setQrCode(meta.getQrCode());
        dto.setCreatedAt(meta.getCreatedAt());
        dto.setUpdatedAt(meta.getUpdatedAt());
        return dto;
    }
    public static ProductMeta toProductMeta(ProductMetaDto dto) {
        if (dto == null) {
            return null;
        }
        ProductMeta meta = new ProductMeta();
        meta.setBarcode(dto.getBarcode());
        meta.setQrCode(dto.getQrCode());
        meta.setCreatedAt(dto.getCreatedAt());
        meta.setUpdatedAt(dto.getUpdatedAt());
        return meta;
    }

    public static ProductReviewDto toProductReviewDto(ProductReview review) {
       ProductReviewDto dto = new ProductReviewDto();
       dto.setRating(review.getRating());
       dto.setComment(review.getComment());
       dto.setDate(review.getDate());
       dto.setReviewerName(review.getReviewerName());
       dto.setReviewerEmail(review.getReviewerEmail());
       return dto;
    }

    public static ProductReview toProductReview(ProductReviewDto dto) {
        if (dto == null) {
            return null;
        }
        ProductReview review = new ProductReview();
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setDate(dto.getDate());
        review.setReviewerName(dto.getReviewerName());
        review.setReviewerEmail(dto.getReviewerEmail());
        return review;
    }
}
