package petadoption.api.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.user.User;

import java.util.List;

public interface UserNotificationRepository extends JpaRepository<UserNotification, Long> {
    List<UserNotification> findByUserOrderByTimestampDesc(User user);
    List<UserNotification> findByUserAndIsReadFalseOrderByTimestampDesc(User user);
}
