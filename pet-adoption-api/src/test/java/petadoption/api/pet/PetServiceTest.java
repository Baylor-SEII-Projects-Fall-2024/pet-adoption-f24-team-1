package petadoption.api.pet;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PetServiceTest {

    @Mock
    private PetRepository petRepository;

    @InjectMocks
    private PetService petService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllPets() {
        Pet pet1 = new Pet();
        Pet pet2 = new Pet();
        when(petRepository.findAll()).thenReturn(Arrays.asList(pet1, pet2));

        List<Pet> pets = petService.getAllPets(-1);
        assertEquals(2, pets.size());

        verify(petRepository, times(1)).findAll();
    }

    @Test
    void testSavePet() {
        Pet pet = new Pet();
        pet.setPetName("Buddy");
        when(petRepository.save(pet)).thenReturn(pet);

        Pet savedPet = petService.savePet(pet);
        assertEquals("Buddy", savedPet.getPetName());

        verify(petRepository, times(1)).save(pet);
    }

    @Test
    void testFindPetById_Present() {
        Long petId = 1L;
        Pet pet = new Pet();
        pet.setPetID(petId);
        when(petRepository.findById(petId)).thenReturn(Optional.of(pet));

        Optional<Pet> foundPet = petService.findPetById(petId);
        assertTrue(foundPet.isPresent());
        assertEquals(petId, foundPet.get().getPetID());

        verify(petRepository, times(1)).findById(petId);
    }

    @Test
    void testFindPetById_NotPresent() {
        Long petId = 1L;
        when(petRepository.findById(petId)).thenReturn(Optional.empty());

        Optional<Pet> foundPet = petService.findPetById(petId);
        assertFalse(foundPet.isPresent());

        verify(petRepository, times(1)).findById(petId);
    }

    @Test
    void testDeletePet_Present() {
        Long petId = 1L;
        Pet pet = new Pet();
        when(petRepository.findById(petId)).thenReturn(Optional.of(pet));

        boolean isDeleted = petService.deletePet(petId);
        assertTrue(isDeleted);

        verify(petRepository, times(1)).findById(petId);
        verify(petRepository, times(1)).deleteById(petId);
    }

    @Test
    void testDeletePet_NotPresent() {
        Long petId = 1L;
        when(petRepository.findById(petId)).thenReturn(Optional.empty());

        boolean isDeleted = petService.deletePet(petId);
        assertFalse(isDeleted);

        verify(petRepository, times(1)).findById(petId);
        verify(petRepository, never()).deleteById(petId);
    }

    @Test
    void testGetSpecies() {
        List<String> speciesList = Arrays.asList("Dog", "Cat");
        when(petRepository.findSpecies()).thenReturn(speciesList);

        List<String> species = petService.getSpecies();
        assertEquals(2, species.size());
        assertEquals("Dog", species.get(0));

        verify(petRepository, times(1)).findSpecies();
    }

    @Test
    void testGetBreeds() {
        List<String> breedsList = Arrays.asList("Bulldog", "Beagle");
        when(petRepository.findBreeds()).thenReturn(breedsList);

        List<String> breeds = petService.getBreeds();
        assertEquals(2, breeds.size());
        assertEquals("Bulldog", breeds.get(0));

        verify(petRepository, times(1)).findBreeds();
    }
}
