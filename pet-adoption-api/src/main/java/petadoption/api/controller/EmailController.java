package petadoption.api.controller;

import org.springframework.web.bind.annotation.*;
import petadoption.api.pet.Pet;

import java.util.List;

import static petadoption.api.email.EmailService.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
@RequestMapping("/api/emails")
@RestController

public class EmailController {
    @GetMapping("/AdminNotificationEmail")
    public void sendAdminNotification(@RequestParam String requesteeName,
                                      @RequestParam String petName,
                                      @RequestParam String adoptionCenter,
                                      @RequestParam String emailAddress ) {
        sendPetAdoptedAdminNotificationEmail(requesteeName, petName, adoptionCenter, emailAddress);
    }
    @GetMapping("/UserRegistrationEmail")
    public void sendUserRegistration(@RequestParam String requesteeName,
                                     @RequestParam String emailRecipient,
                                     @RequestParam String emailAddress ) {
        sendUserRegistrationEmail(requesteeName, emailRecipient, emailAddress);
    }
    @GetMapping("/UserAdoptionConfirmed")
    public void sendUserAdoptionConfirmed(@RequestParam String requesteeName,
                                          @RequestParam String petName,
                                          @RequestParam String emailRecipient,
                                          @RequestParam String emailAddress ) {
        sendUserAdoptionConfirmedEmail(requesteeName, petName, emailRecipient,  emailAddress);
    }
    @GetMapping("/UserAdoptionDenied")
    public void sendUserAdoptionDenied(@RequestParam String requesteeName,
                                       @RequestParam String petName,
                                       @RequestParam String emailRecipient,
                                       @RequestParam String emailAddress ) {
        sendUserAdoptionDeniedEmail(requesteeName, petName, emailRecipient, emailAddress);
    }

}
