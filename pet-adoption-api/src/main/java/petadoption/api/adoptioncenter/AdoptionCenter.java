package petadoption.api.adoptioncenter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdmin;
import petadoption.api.notification.Notification;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "adoption_centers")
@Data
public class AdoptionCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "center_generator")
    private long centerId;

    @Column(name = "center_name")
    private String centerName;

    @Column(name = "center_address")
    private String centerAddress;

    @Column(name = "center_phone")
    private String centerPhone;

    @Column(name = "center_email")
    private String centerEmail;

    @Column(name = "zip_code")
    private long zipCode;

    @Column(name = "center_image_url")
    private String centerImageUrl;

    @OneToMany(mappedBy = "adoptionCenter", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Notification> notifications = new ArrayList<>();
}
