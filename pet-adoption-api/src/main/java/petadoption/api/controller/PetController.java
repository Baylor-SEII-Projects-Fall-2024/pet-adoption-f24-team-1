package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.pet.Pet;
import petadoption.api.pet.PetService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/pets")
@RestController
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    @PostMapping
    public ResponseEntity<Pet> addPet(@RequestBody Pet pet) {
        Pet createdPet = petService.savePet(pet);
        return new ResponseEntity<>(createdPet, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<String> deletePet(@PathVariable Long id) {
        boolean isRemoved = petService.deletePet(id);
        if (!isRemoved) {
            return new ResponseEntity<>("Pet not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Pet deleted successfully", HttpStatus.OK);
    }
}
