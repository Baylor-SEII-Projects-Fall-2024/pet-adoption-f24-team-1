package petadoption.api.recommendationEngine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.matches.MatchService;
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
    private final int TOP_COLOR_SCORE = 75;
    private final int TOP_GENDER_SCORE = 50;
    private final int TOP_SIZE_SCORE = 75;

    public List<Pet> recommendationAlgorithm(Long userID)  {
        // Map of pets and their overall score
        Map<Pet, Integer> petScores = new HashMap<>();

        // Initial list of all pets in the database
        List<Pet> pets = recommendationEngineRepository.findAllNotMatched(userID);

        // If the user hasn't liked 5 pets yet, recommend randomly
        if(recommendationEngineRepository.findMatchCount(userID) < 5)  {
            return pets;
        }

        // Get attributes and their frequency within user's matched pets
        List<AttributeFrequency> speciesFrequency = recommendationEngineRepository.findSpeciesFrequency(userID);
        List<AttributeFrequency> breedFrequency = recommendationEngineRepository.findBreedFrequency(userID);
        List<AttributeFrequency> colorFrequency = recommendationEngineRepository.findColorFrequency(userID);
        List<AttributeFrequency> genderFrequency = recommendationEngineRepository.findGenderFrequency(userID);

        // Loop through each pet and score it
        for(Pet pet : pets)  {
            // Set initial scores
            int score = 0;

            // Check species for points
            score += collectPoints(pet.getPetSpecies(), speciesFrequency, TOP_SPECIES_SCORE);
            // Check breed for points
            score += collectPoints(pet.getPetBreed(), breedFrequency, TOP_BREED_SCORE);
            // Check color for points
            score += collectPoints(pet.getColor(), colorFrequency, TOP_COLOR_SCORE);
            // Check gender for points
            score += collectPoints(pet.getPetGender(), genderFrequency, TOP_GENDER_SCORE);

            // Add pet and final score to map
            petScores.put(pet, score);
        }

        for(Map.Entry<Pet,Integer> entry : petScores.entrySet()) {
            System.out.println("Name = " + entry.getKey().getPetName() + ", Score = " + entry.getValue());
        }

        List<Pet> recommendedPets = petScores.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .map(Map.Entry::getKey)
                .toList();

        return recommendedPets;
    }


    // collects points based on attribute
    public int collectPoints(String atrValue, List<AttributeFrequency> afs, int atrPoints)  {
        int points = 0;
        for(AttributeFrequency attributeFrequency : afs)  {
            if(atrValue.equals(attributeFrequency.getAttribute())) {
                points += atrPoints;
                break;
            }
            atrPoints = (int) round(atrPoints * 0.75);
        }
        return points;
    }
}