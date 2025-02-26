package net.ecommerce.ecom_backend.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Meta {
    private String createdAt;
    private String updatedAt;
    private String barcode;
    private String qrCode;
}
