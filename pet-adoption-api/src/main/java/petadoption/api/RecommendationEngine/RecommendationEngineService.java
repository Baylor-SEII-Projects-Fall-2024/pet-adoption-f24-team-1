package petadoption.api.RecommendationEngine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.pet.Pet;

import java.util.List;
import java.util.Map;

@Service
public class RecommendationEngineService {

    @Autowired
    private RecommendationEngineRepository recommendationEngineRepository;

    public List<Pet> recommendationAlgorithm(int userID)  {
        // Initial list of all pets in the database
        List<Pet> pets = recommendationEngineRepository.findAll();

        // Attributes and their frequency within user's matched pets
        Map<String, Integer> speciesLikes;
        Map<String, Integer> breedLikes;
        Map<String, Integer> sizeLikes;



        return null;
    }
}
