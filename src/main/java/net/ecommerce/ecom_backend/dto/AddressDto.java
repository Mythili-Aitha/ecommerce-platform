package net.ecommerce.ecom_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.ecommerce.ecom_backend.enums.AddressType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {
    private Long id;
    private String street;
    private String city;
    private String state;
    private Integer zip;
    private String country;

    private AddressType addressType;
    private Long userId;

}
