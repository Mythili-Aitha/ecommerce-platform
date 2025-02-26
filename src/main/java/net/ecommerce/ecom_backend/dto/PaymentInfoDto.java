package net.ecommerce.ecom_backend.dto;


import lombok.Getter;
import lombok.Setter;
import net.ecommerce.ecom_backend.enums.CardType;

@Getter
@Setter
public class PaymentInfoDto {
    private Long paymentId;
    private String cardNumber;
    private String cardHolderName;
    private String expiryDate;
    private String cvv;
    private CardType cardType;
    private Long userId;


}
