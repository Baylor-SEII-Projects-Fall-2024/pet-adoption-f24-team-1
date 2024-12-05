package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;
import petadoption.api.notification.*;
import petadoption.api.user.User;
import petadoption.api.user.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/notifications/user")
@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
public class UserNotificationController {

    @Autowired
    private UserNotificationRepository userNotificationRepository;

    @Autowired
    private UserNotificationService userNotificationService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public List<UserNotification> getNotifications(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found"));

        return userNotificationRepository.findByUserOrderByTimestampDesc(user);
    }

    @GetMapping("/unread/{userId}")
    public List<UserNotification> getUnreadNotifications(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found"));

        return userNotificationRepository.findByUserAndIsReadFalseOrderByTimestampDesc(user);
    }

    @PostMapping("/markAsRead/{notificationId}")
    public void markNotificationAsRead(@PathVariable Long notificationId) {
        UserNotification userNotification = userNotificationRepository.findById(notificationId).orElseThrow(
                () -> new RuntimeException("Notification not found"));
        userNotification.setRead(true);
        userNotificationRepository.save(userNotification);
    }

    @PostMapping("/send")
    public ResponseEntity<UserNotification> sendNotification(@RequestParam String title, String message, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found"));
        UserNotification userNotification = userNotificationService.createNotification(title, message, user);
        return new ResponseEntity<>(userNotification, HttpStatus.OK);
    }
}