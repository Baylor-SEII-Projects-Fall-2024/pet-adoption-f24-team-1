package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import petadoption.api.pet.Pet;
import petadoption.api.pet.PetService;

import java.util.List;

@RestController
public class PetController {

    @Autowired
    private PetService petService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/pets")
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }
}
