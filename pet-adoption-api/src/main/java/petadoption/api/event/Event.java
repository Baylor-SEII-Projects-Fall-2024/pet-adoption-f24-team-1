package petadoption.api.event;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "event")
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

    // Setter for imageUrl (if needed for other operations)
    @Setter
    private String imageUrl;  // Added field for image URL

    // Setter for detailsPage (if needed for other operations)
    @Setter
    private String detailsPage;  // Added field for event details page URL

}
