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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CENTER_ID")
    private long centerId;

    @Column(name = "NAME")
    private String name;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "EMAIL")
    private String email;

    @OneToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private AdoptionCenterAdmin admin;
}
