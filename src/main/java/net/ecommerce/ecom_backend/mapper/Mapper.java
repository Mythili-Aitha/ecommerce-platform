package net.ecommerce.ecom_backend.mapper;

import net.ecommerce.ecom_backend.dto.AddressDto;
import net.ecommerce.ecom_backend.dto.PaymentInfoDto;
import net.ecommerce.ecom_backend.dto.UserDto;
import net.ecommerce.ecom_backend.entity.Address;
import net.ecommerce.ecom_backend.entity.PaymentInfo;
import net.ecommerce.ecom_backend.entity.User;

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
}
