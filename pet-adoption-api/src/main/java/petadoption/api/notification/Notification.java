package petadoption.api.notification;

import jakarta.persistence.*;
import lombok.Data;
import petadoption.api.adoptioncenter.AdoptionCenter;

import java.util.Date;

@Entity
@Table(name = "notifications")
@Data
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "message")
    private String message;

    @Column(name = "timestamp")
    private Date timestamp;

    @Column(name = "is_read")
    private boolean isRead;

    @ManyToOne
    @JoinColumn(name = "center_id", nullable = false)
    private AdoptionCenter adoptionCenter;
}
