package petadoption.api.pet;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pet")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int petID;
    private String petName;
    private String petBreed;
    private String petGender;
    private int petAge;
    private double petWeight;
    private String petSpecies;
    private String color;
}
