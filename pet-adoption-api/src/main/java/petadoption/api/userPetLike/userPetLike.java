package petadoption.api.userPetLike;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import petadoption.api.pet.Pet;
import petadoption.api.user.User;

@Entity
@Table(name = "userPetLike")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class userPetLike {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "PET_ID", nullable = false)
    private Pet pet;

    @Column(name = "LIKED_AT", nullable = false)
    private LocalDateTime likedAt = LocalDateTime.now();

}
