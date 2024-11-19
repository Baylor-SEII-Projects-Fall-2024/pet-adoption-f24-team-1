package petadoption.api.PetAdoptionForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;
import petadoption.api.notification.NotificationService;
import petadoption.api.pet.Pet;
import petadoption.api.pet.PetRepository;

import java.util.List;

@Service
public class PetAdoptionFormService {

    @Autowired
    private PetAdoptionFormRepository petAdoptionFormRepository;

    @Autowired
    private AdoptionCenterRepository adoptionCenterRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private NotificationService notificationService;

    // Method to save the form data
    public PetAdoptionForm save(PetAdoptionForm form) {
        return petAdoptionFormRepository.save(form);
    }

    // Method to get all forms for admin
    public List<PetAdoptionForm> findAll() {
        return petAdoptionFormRepository.findAll();
    }

    public List<PetAdoptionForm> getAllForms() {
        return petAdoptionFormRepository.findAll();
    }

    public PetAdoptionForm submitAdoptionForm(PetAdoptionForm form) {
        // Get pet from petId
        Pet pet = petRepository .findById(form.getPetId()).orElseThrow(
                () -> new RuntimeException("Adoption center not found"));

        // Get center from centerId
        AdoptionCenter center = adoptionCenterRepository.findById(pet.getCenterID()).orElseThrow(
                () -> new RuntimeException("Adoption center not found"));

        String title = "New adoption form submission";

        String message = form.getFullName() + " wants to adopt " + pet.getPetName() + "!";

        notificationService.createNotification(title, message, form, center);

        //Save form to database
        return petAdoptionFormRepository.save(form);
    }
}
