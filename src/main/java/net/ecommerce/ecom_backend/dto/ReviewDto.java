package net.ecommerce.ecom_backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private Integer rating;
    private String comment;
    private String date;
    private String reviewerName;
    private String reviewerEmail;

}
