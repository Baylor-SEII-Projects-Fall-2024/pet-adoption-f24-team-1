package petadoption.api.Recommendation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Recommendation")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int speciesLikes;
    private int breedLikes;
    private int genderLikes;
    private int ageLikes;
    private int weightLikes;
    private int colorLikes;

}
