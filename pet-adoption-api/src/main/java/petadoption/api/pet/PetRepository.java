package petadoption.api.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    @Query("SELECT DISTINCT p.petSpecies FROM Pet p")
    List<String> findSpecies();
    @Query(" SELECT p FROM Pet p WHERE p.centerID = (SELECT ac.centerId FROM AdoptionCenterAdmin aca" +
            " JOIN aca.adoptionCenter ac WHERE aca.id = :centerID)" )
    List<Pet> findAllByAdminID(@Param("centerID") Long centerID);
    @Query("SELECT DISTINCT p.petBreed FROM Pet p")
    List<String> findBreeds();
    Pet findPetByPetID(Long petID);
}
