package petadoption.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petadoption.api.PetAdoptionForm.petAdoptionForm;

import java.util.List;

@RestController
@RequestMapping("/api/pet-adoption-forms")
@CrossOrigin(origins = {"http://localhost:3000", "http://35.238.40.26:3000"})
public class petAdoptionFormController {

    private static final Logger logger = LoggerFactory.getLogger(petAdoptionFormController.class);

    @Autowired
    private petadoption.api.PetAdoptionForm.petAdoptionFormService petAdoptionFormService; // Assume you have a service class
    @PostMapping()
    public petAdoptionForm submitForm(@RequestBody petAdoptionForm form) {
        logger.info("Received form submission: {}", form);
        return petAdoptionFormService.save(form); // Save the form data
    }

    @GetMapping
    public List<petAdoptionForm> getAllForms() {
        return petAdoptionFormService.findAll(); // Get all forms for admin
    }
}
