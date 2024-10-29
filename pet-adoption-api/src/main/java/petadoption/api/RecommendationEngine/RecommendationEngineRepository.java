package petadoption.api.RecommendationEngine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import petadoption.api.pet.Pet;

import java.util.List;

public interface RecommendationEngineRepository extends JpaRepository<Pet, Long> {

    @Query(nativeQuery = true, value =
                    "SELECT pet_species, COUNT(*) as count " +
                    "FROM (SELECT pet_species " +
                          "FROM pet p JOIN matches m ON p.petid = m.petid " +
                          "WHERE m.userid = :userID) as matchedPets " +
                    "GROUP BY pet_species " +
                    "ORDER BY COUNT DESC"
    )
    public List<AttributeFrequency> findSpeciesFrequency(@Param("userID") Long userID);

    @Query(nativeQuery = true, value =
            "SELECT pet_species, COUNT(*) as count " +
                    "FROM (SELECT pet_breed " +
                    "FROM pet p JOIN matches m ON p.petid = m.petid " +
                    "WHERE m.userid = :userID) as matchedPets " +
                    "GROUP BY pet_species " +
                    "ORDER BY COUNT DESC"
    )
    public List<AttributeFrequency> findBreedFrequency(@Param("userID") Long userID);

}
