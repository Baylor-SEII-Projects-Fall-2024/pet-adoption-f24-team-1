package petadoption.api.adoptioncenter;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdmin;

@Entity
@Table(name = "adoption_center")
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
}
