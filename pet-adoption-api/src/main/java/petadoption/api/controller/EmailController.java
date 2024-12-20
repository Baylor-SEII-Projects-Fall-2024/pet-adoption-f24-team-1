package petadoption.api.controller;

import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdmin;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdminRepository;
import petadoption.api.pet.Pet;
import petadoption.api.pet.PetRepository;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;
import petadoption.api.user.User;
import petadoption.api.user.UserRepository;

import java.util.List;

import static petadoption.api.email.EmailService.*;



@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
@RequestMapping("/api/emails")
@RestController

public class EmailController {

    @Autowired
    private PetRepository petRepository;
    @Autowired
    private AdoptionCenterRepository adoptionCenterRepository;
    @Autowired
    private AdoptionCenterAdminRepository adoptionCenterAdminRepository;
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/Admin-Email-Notification")
    public String sendAdminNotification(@RequestParam String requesteeName,
                                      @RequestParam Long petId) {

        Pet pet =
                petRepository.findPetByPetID(petId);
        AdoptionCenter center =
                adoptionCenterRepository.findAdoptionCenterByCenterId(pet.getCenterID());
        AdoptionCenterAdmin adoptionCenterAdmin =
                adoptionCenterAdminRepository.findAdoptionCenterAdminByAdoptionCenter(center);
        String adminEmail = adoptionCenterAdmin.getEmail();
        sendPetAdoptedAdminNotificationEmail(requesteeName, pet.getPetName(), center.getCenterName(), adminEmail);
       return "Email sent to " + adminEmail;
    }
    @GetMapping("/User-Registration-Email")
    public String sendUserRegistration(@RequestParam String emailRecipient,
                                     @RequestParam String emailAddress ) {
        sendUserRegistrationEmail(emailRecipient, emailAddress);
        return "Registration confirmation email sent to " + emailAddress;

    }
    @GetMapping("/User-Adoption-Confirmed")
    public String sendUserAdoptionConfirmed(@RequestParam String petName,
                                          @RequestParam Long userId) {
        User user = userRepository.findById(userId.longValue());
        sendUserAdoptionConfirmedEmail(petName, user.getFirstName(),  user.getEmail());
        return "Adoption acceptance email sent to " + user.getEmail();
    }
    @GetMapping("/User-Adoption-Denied")
    public String sendUserAdoptionDenied(@RequestParam String petName,
                                       @RequestParam Long userId) {
        User user = userRepository.findById(userId.longValue());
        sendUserAdoptionDeniedEmail(petName, user.getFirstName(),  user.getEmail());
        return "Adoption denial email sent to " + user.getEmail();
    }

}
