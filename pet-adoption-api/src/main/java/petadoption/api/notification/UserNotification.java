package petadoption.api.notification;

import jakarta.persistence.*;
import lombok.Data;
import petadoption.api.PetAdoptionForm.PetAdoptionForm;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.user.User;

import java.util.Date;

@Entity
@Table(name = "user_notifications")
@Data
public class UserNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "message")
    private String message;

    @Column(name = "timestamp")
    private Date timestamp;

    @Column(name = "is_read")
    private boolean isRead;

    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;
}
