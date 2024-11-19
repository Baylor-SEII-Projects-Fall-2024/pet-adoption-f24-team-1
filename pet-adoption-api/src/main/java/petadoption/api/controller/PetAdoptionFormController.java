package petadoption.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.PetAdoptionForm.PetAdoptionForm;
import petadoption.api.PetAdoptionForm.PetAdoptionFormService;

import java.util.List;

@RestController
@RequestMapping("/api/pet-adoption-forms")
@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
public class PetAdoptionFormController {

    @Autowired
    private PetAdoptionFormService petAdoptionFormService;

    @PostMapping()
    public ResponseEntity<PetAdoptionForm> submitForm(@RequestBody PetAdoptionForm form) {
        PetAdoptionForm submittedForm = petAdoptionFormService.submitAdoptionForm(form);
        return new ResponseEntity<>(submittedForm, HttpStatus.OK);
    }

    @GetMapping
    public List<PetAdoptionForm> getAllForms() {
        return petAdoptionFormService.findAll(); // Get all forms for admin
    }
}
