package petadoption.api.matches;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import petadoption.api.pet.Pet;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {
    @Query("SELECT p FROM Pet p INNER JOIN Match m ON p.petID = m.petID WHERE m.userID = :userID")
    List<Pet> getMatchedPets(@Param("userID") int userID);

    List<Match> findByUserIDAndPetID(int userID, int petID);
}
