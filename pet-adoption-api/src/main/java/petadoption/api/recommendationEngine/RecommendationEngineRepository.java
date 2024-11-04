package petadoption.api.recommendationEngine;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import petadoption.api.pet.Pet;

import java.util.List;

public interface RecommendationEngineRepository extends JpaRepository<Pet, Long> {

    @Query(nativeQuery = true, value =
                    "SELECT attribute, COUNT(*) as frequency " +
                    "FROM (SELECT pet_species AS attribute " +
                          "FROM pet p JOIN matches m ON p.petid = m.petid " +
                          "WHERE m.userid = :userID) as matchedPets " +
                    "GROUP BY attribute " +
                    "ORDER BY frequency DESC"
    )
    public List<AttributeFrequency> findSpeciesFrequency(@Param("userID") Long userID);

    @Query(nativeQuery = true, value =
            "SELECT attribute, COUNT(*) as frequency " +
                    "FROM (SELECT pet_breed AS attribute " +
                    "FROM pet p JOIN matches m ON p.petid = m.petid " +
                    "WHERE m.userid = :userID) as matchedPets " +
                    "GROUP BY attribute " +
                    "ORDER BY frequency DESC"
    )
    public List<AttributeFrequency> findBreedFrequency(@Param("userID") Long userID);

}
