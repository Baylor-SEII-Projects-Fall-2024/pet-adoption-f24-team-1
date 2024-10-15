package petadoption.api.event;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "event")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // Why are there two event ids?? one event_id and one eventID
    private long eventID;

    private String title;
    private LocalDateTime date;
    private String description;
    private String location;
}
