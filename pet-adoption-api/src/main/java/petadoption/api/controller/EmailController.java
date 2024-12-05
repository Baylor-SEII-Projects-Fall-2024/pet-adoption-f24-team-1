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
    public void sendUserRegistration(@RequestParam String requesteeName,
                                     @RequestParam String emailRecipient,
                                     @RequestParam String emailAddress ) {
        sendUserRegistrationEmail(requesteeName, emailRecipient, emailAddress);
    }
    @GetMapping("/User-Adoption-Confirmed")
    public void sendUserAdoptionConfirmed(@RequestParam String requesteeName,
                                          @RequestParam String petName,
                                          @RequestParam String emailRecipient,
                                          @RequestParam String emailAddress ) {
        sendUserAdoptionConfirmedEmail(requesteeName, petName, emailRecipient,  emailAddress);
    }
    @GetMapping("/User-Adoption-Denied")
    public void sendUserAdoptionDenied(@RequestParam String requesteeName,
                                       @RequestParam String petName,
                                       @RequestParam String emailRecipient,
                                       @RequestParam String emailAddress ) {
        sendUserAdoptionDeniedEmail(requesteeName, petName, emailRecipient, emailAddress);
    }

}
