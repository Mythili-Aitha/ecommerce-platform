package net.ecommerce.ecom_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.ecommerce.ecom_backend.enums.CardType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentInfoDto {
    private Long paymentId;
    private boolean selected;
    private String paymentMethod;
    private String cardNumber;
    private String cardHolderName;
    private String expiryDate;
    private String cvv;
    private CardType cardType;
    private Long userId;


}
