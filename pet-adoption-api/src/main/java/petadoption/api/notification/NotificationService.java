package petadoption.api.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.PetAdoptionForm.PetAdoptionForm;
import petadoption.api.adoptioncenter.AdoptionCenter;

import java.util.Date;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(String title, String message, PetAdoptionForm form, AdoptionCenter center) {
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setTimestamp(new Date());
        notification.setRead(false);
        notification.setPetAdoptionForm(form);
        notification.setAdoptionCenter(center);

        notificationRepository.save(notification);
    }
}
