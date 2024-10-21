package petadoption.api.adoptioncenteradmin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import petadoption.api.adoptioncenter.AdoptionCenter;

@Entity
@Table(name = "adoption_center_admins")
@Data
public class AdoptionCenterAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_generator")
    private Long id;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "center_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private AdoptionCenter adoptionCenter;
}
