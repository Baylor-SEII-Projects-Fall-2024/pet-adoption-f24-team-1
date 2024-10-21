package petadoption.api.adoptioncenteradmin;

import jakarta.persistence.*;
import lombok.Data;
import petadoption.api.adoptioncenter.AdoptionCenter;

@Data
@Entity
@Table(name = AdoptionCenterAdmin.TABLE_NAME)
public class AdoptionCenterAdmin {
    public static final String TABLE_NAME = "adoption_center_admins";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "ADMIN_ID")
    private Long id;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @PrimaryKeyJoinColumn(name = "adoption_center")
    @OneToOne(mappedBy = "admin", cascade = CascadeType.ALL)
    private AdoptionCenter adoptionCenter;
}
