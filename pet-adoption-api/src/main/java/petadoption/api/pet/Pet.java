package petadoption.api.pet;

import jakarta.persistence.*;

import lombok.*;


@Entity
@Table(name = "pet")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long petID;
    private String petName;
    private String petBreed;
    private String petGender;
    private int petAge;
    private int petWeight;
    private String petSpecies;
    private String color;
    private String imgUrl;
}
