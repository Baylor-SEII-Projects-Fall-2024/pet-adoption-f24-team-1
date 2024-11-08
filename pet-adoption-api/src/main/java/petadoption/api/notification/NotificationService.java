package petadoption.api.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.adoptioncenter.AdoptionCenter;

import java.util.Date;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(AdoptionCenter center, String message) {
        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setTimestamp(new Date());
        notification.setRead(false);
        notification.setAdoptionCenter(center);

        notificationRepository.save(notification);
    }
}
