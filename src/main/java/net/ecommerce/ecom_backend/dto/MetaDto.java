package net.ecommerce.ecom_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MetaDto {
    private String createdAt;
    private String updatedAt;
    private String barcode;
    private String qrCode;
}
