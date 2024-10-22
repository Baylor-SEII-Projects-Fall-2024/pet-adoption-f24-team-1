package petadoption.api.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    @Query("SELECT DISTINCT p.petSpecies FROM Pet p")
    List<String> findSpecies();

    @Query("SELECT DISTINCT p.petBreed FROM Pet p")
    List<String> findBreeds();
}
