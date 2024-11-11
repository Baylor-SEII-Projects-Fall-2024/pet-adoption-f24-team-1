package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;
import petadoption.api.notification.Notification;
import petadoption.api.notification.NotificationRepository;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private AdoptionCenterRepository adoptionCenterRepository;

    @GetMapping("/{centerId}")
    public List<Notification> getNotifications(@PathVariable Long centerId) {
        AdoptionCenter center = adoptionCenterRepository.findById(centerId).orElseThrow(
                () -> new RuntimeException("Adoption center not found"));

        return notificationRepository.findByAdoptionCenterOrderByTimestampDesc(center);
    }

    @GetMapping("/unread/{centerId}")
    public List<Notification> getUnreadNotifications(@PathVariable Long centerId) {
        AdoptionCenter center = adoptionCenterRepository.findById(centerId).orElseThrow(
                () -> new RuntimeException("Adoption center not found"));

        return notificationRepository.findByAdoptionCenterAndIsReadFalseOrderByTimestampDesc(center);
    }

    @PostMapping("/markAsRead/{notificationId}")
    public void markNotificationAsRead(@PathVariable Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(
                () -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        notificationRepository.save(notification);
    }
}