package petadoption.api.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import petadoption.api.adoptioncenter.AdoptionCenter;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByAdoptionCenterAndIsReadFalse(AdoptionCenter center);
}
