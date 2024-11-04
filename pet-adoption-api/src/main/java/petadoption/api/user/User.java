package petadoption.api.user;

import jakarta.persistence.*;
import lombok.Data;
import petadoption.api.userpreference.UserPreference;

@Data
@Entity
@Table(name = User.TABLE_NAME)
public class User {
    public static final String TABLE_NAME = "USERS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "USER_ID")
    private Long id;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "BIO")
    private String bio;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "LOCATION")
    private String location;

    @Column(name = "IMG_URG")
    private String imgUrl;

    @Column(name = "PASSWORD")
    private String password;

    @Column(nullable = false, updatable = false)
    private final String role = "USER";

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "preference_id")
    private UserPreference userPreference;

}
