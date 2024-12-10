package petadoption.api.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public List<Pet> getAllPets(int limit) {
        if (limit >= 0) {
            return petRepository.findAll(PageRequest.of(0, limit)).getContent();
        }
        return petRepository.findAll();
    }

    public Optional<Pet> getPet(Long petId) {
        return petRepository.findById(petId);
    }
    public List<Pet> getAllPetsByAdminId(Long adminID) {
        return petRepository.findAllByAdminID(adminID);
    }

    public List<Pet> getPetsByAdoptionCenterId(Long adoptionCenterId) {
        return petRepository.findByCenterID(adoptionCenterId);
    }

    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }

    public Optional<Pet> findPetById(Long id) {
        return petRepository.findById(id);
    }

    public boolean deletePet(Long id) {
        Optional<Pet> petOptional = petRepository.findById(id);
        if (petOptional.isPresent()) {
            petRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<String> getSpecies()  {
        return petRepository.findSpecies();
    }

    public List<String> getBreeds()  {
        return petRepository.findBreeds();
    }
}
