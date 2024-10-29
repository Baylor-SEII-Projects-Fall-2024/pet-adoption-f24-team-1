package petadoption.api.RecommendationEngine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.pet.Pet;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.Math.round;

@Service
public class RecommendationEngineService {

    @Autowired
    private RecommendationEngineRepository recommendationEngineRepository;

    private final int TOP_SPECIES_SCORE = 150;
    private final int TOP_BREED_SCORE = 100;

    public List<Pet> recommendationAlgorithm(Long userID)  {
        // Map of pets and their overall score
        Map<Pet, Integer> petScores = new HashMap<>();

        // Initial list of all pets in the database
        List<Pet> pets = recommendationEngineRepository.findAll();

        // Get attributes and their frequency within user's matched pets
        List<AttributeFrequency> speciesFrequency = recommendationEngineRepository.findSpeciesFrequency(userID);
        List<AttributeFrequency> breedFrequency = recommendationEngineRepository.findBreedFrequency(userID);

        // Initialize initial scores
        int speciesPoints = TOP_SPECIES_SCORE;
        int breedPoints = TOP_BREED_SCORE;

        // Loop through each pet and score it
        for(Pet pet : pets)  {
            int score = 0;
            // Check species for points
            for(AttributeFrequency attributeFrequency : speciesFrequency)  {
                if(pet.getPetSpecies().equals(attributeFrequency.getAttribute())) {
                    score += speciesPoints;
                    break;
                }
                speciesPoints = (int) round(speciesPoints * 0.75);
            }
            // Check breed for points
            for(AttributeFrequency attributeFrequency : breedFrequency)  {
                if(pet.getPetSpecies().equals(attributeFrequency.getAttribute())) {
                    score += breedPoints;
                    break;
                }
                breedPoints = (int) round(breedPoints * 0.75);
            }

            // Add pet and final score to map
            petScores.put(pet, score);
        }

        List<Pet> recommendedPets = petScores.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .map(Map.Entry::getKey)
                .toList();


        return recommendedPets;
    }
}
