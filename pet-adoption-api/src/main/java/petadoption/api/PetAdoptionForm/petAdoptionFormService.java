package petadoption.api.PetAdoptionForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.PetAdoptionForm.petAdoptionForm;

import java.util.List;

@Service
public class petAdoptionFormService {

    private final petAdoptionFormRepository petAdoptionFormRepository;

    @Autowired
    public petAdoptionFormService(petAdoptionFormRepository petAdoptionFormRepository) {
        this.petAdoptionFormRepository = petAdoptionFormRepository;
    }

    // Method to save the form data
    public petAdoptionForm save(petAdoptionForm form) {
        return petAdoptionFormRepository.save(form);
    }

    // Method to get all forms for admin
    public List<petAdoptionForm> findAll() {
        return petAdoptionFormRepository.findAll();
    }

    public List<petAdoptionForm> getAllForms() {
        return petAdoptionFormRepository.findAll();
    }
}
