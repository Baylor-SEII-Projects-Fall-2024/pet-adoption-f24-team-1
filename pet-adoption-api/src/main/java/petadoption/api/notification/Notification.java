package petadoption.api.notification;

import jakarta.persistence.*;
import lombok.Data;
import petadoption.api.PetAdoptionForm.PetAdoptionForm;
import petadoption.api.adoptioncenter.AdoptionCenter;

import java.util.Date;

@Entity
@Table(name = "notifications")
@Data
public class Notification {
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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "form_id")
    private PetAdoptionForm petAdoptionForm;

    @ManyToOne
    @JoinColumn(name = "center_id", nullable = false)
    private AdoptionCenter adoptionCenter;
}
