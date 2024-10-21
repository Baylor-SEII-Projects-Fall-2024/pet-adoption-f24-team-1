package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.pet.Pet;
import petadoption.api.pet.PetService;

import java.util.List;
import java.util.Optional;

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

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet updatedPet) {
        Optional<Pet> petOptional = petService.findPetById(id);

        if (petOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Pet pet = petOptional.get();
        pet.setPetName(updatedPet.getPetName());
        pet.setPetBreed(updatedPet.getPetBreed());
        pet.setPetGender(updatedPet.getPetGender());
        pet.setPetAge(updatedPet.getPetAge());
        pet.setPetWeight(updatedPet.getPetWeight());
        pet.setPetSpecies(updatedPet.getPetSpecies());
        pet.setColor(updatedPet.getColor());
        pet.setImgUrl(updatedPet.getImgUrl());

        Pet savedPet = petService.savePet(pet);
        return new ResponseEntity<>(savedPet, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePet(@PathVariable Long id) {
        boolean isRemoved = petService.deletePet(id);
        if (!isRemoved) {
            return new ResponseEntity<>("Pet not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Pet deleted successfully", HttpStatus.OK);
    }

    @GetMapping("/species")
    public List<String> getSpecies()  {
        return petService.getSpecies();
    }
}
