package petadoption.api.event;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import petadoption.api.adoptioncenter.AdoptionCenter;

import java.time.LocalDate;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long eventID;

    private String title;
    private LocalDate date;
    private String description;
    private String location;

    // Linking Event to AdoptionCenter
    @ManyToOne
    @JoinColumn(name = "adoption_center_id", referencedColumnName = "centerId")
    @JsonIgnore  // Add this annotation to ignore the adoptionCenter during serialization
    private AdoptionCenter adoptionCenter;

    @Setter
    @Getter
    private String imageUrl;

    @Setter
    @Getter
    private String detailsPage;
}