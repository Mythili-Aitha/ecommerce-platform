package net.ecommerce.ecom_backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.ecommerce.ecom_backend.enums.AddressType;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="address")
@SQLDelete(sql = "UPDATE address SET deleted = true WHERE id = ?")
//@Where(clause = "deleted = false")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String street;
    private String city;
    private String state;
    private Integer zip;
    private String country;

    @Enumerated(EnumType.STRING)
    private AddressType addressType;

    @ManyToOne
    @JoinColumn(name = "user_Id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Boolean deleted = false;
}
