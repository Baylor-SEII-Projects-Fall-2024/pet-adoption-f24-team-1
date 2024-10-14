package petadoption.api.adoptioncenter;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "adoptionCenter")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long centerId;
    String name;
    String address;
    String phone;
    String email;
}
