package petadoption.api.adoptioncenter;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import petadoption.api.event.Event;
import petadoption.api.notification.Notification;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "adoption_centers")
@Data
public class AdoptionCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "center_generator")
    private long centerId;

    @Column(name = "center_name")
    private String centerName;

    @Column(name = "center_address")
    private String centerAddress;

    @Column(name = "center_phone")
    private String centerPhone;

    @Column(name = "center_email")
    private String centerEmail;

    @Column(name = "zip_code")
    private long zipCode;

    @Column(name = "center_image_url")
    private String centerImageUrl;

    // One-to-many relationship with Event
    @OneToMany(mappedBy = "adoptionCenter", cascade = CascadeType.ALL)
    private List<Event> events = new ArrayList<>();

    @OneToMany(mappedBy = "adoptionCenter", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Notification> notifications = new ArrayList<>();

    // Method to add an event to this adoption center
    public void addEvent(Event event) {
        event.setAdoptionCenter(this);  // Set the current AdoptionCenter as the parent
        this.events.add(event);  // Add the event to the list of events
    }

    // Method to remove an event from this adoption center (if needed)
    public void removeEvent(Event event) {
        event.setAdoptionCenter(null);  // Disassociate the event from this AdoptionCenter
        this.events.remove(event);  // Remove the event from the list
    }
}