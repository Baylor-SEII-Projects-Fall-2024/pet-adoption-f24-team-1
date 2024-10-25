package petadoption.api.userpreference;

import jakarta.persistence.*;
import lombok.Data;
import petadoption.api.user.User;

@Entity
@Data
@Table(name = "user_preferences")
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "preference_generator")
    private Long preferenceId;

    @Column(name = "preferred_species")
    private String preferredSpecies;

    @Column(name = "preferred_breed")
    private String preferredBreed;

    @Column(name = "preferred_gender")
    private String preferredGender;

    @Column(name = "preferred_Size")
    private String preferredSize;

    @Column(name = "age_min")
    private Integer ageMin;

    @Column(name = "age_max")
    private Integer ageMax;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
