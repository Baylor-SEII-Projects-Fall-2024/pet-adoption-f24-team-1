package petadoption.api.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.PetAdoptionForm.PetAdoptionForm;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.pet.Pet;
import petadoption.api.user.User;

import java.util.Date;
import java.util.Optional;

@Service
public class UserNotificationService {

    @Autowired
    private UserNotificationRepository userNotificationRepository;

    public UserNotification createNotification(String title, String message, User user) {
        UserNotification notification = new UserNotification();
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setTimestamp(new Date());
        notification.setRead(false);
        notification.setUser(user);

        return userNotificationRepository.save(notification);
    }

    public boolean deleteNotification(Long id) {
        Optional<UserNotification> petOptional = userNotificationRepository.findById(id);
        if (petOptional.isPresent()) {
            userNotificationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
