package petadoption.api.recommendationEngine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterService;
import petadoption.api.distanceMatrix.Distance;
import petadoption.api.distanceMatrix.DistanceMatrixService;
import petadoption.api.matches.MatchService;
import petadoption.api.pet.Pet;

import java.util.*;

import static java.lang.Math.round;

@Service
public class RecommendationEngineService {

    @Autowired
    private RecommendationEngineRepository recommendationEngineRepository;

    @Autowired
    private AdoptionCenterService adoptionCenterService;

    @Autowired
    private DistanceMatrixService distanceMatrixService;

    private final int TOP_SPECIES_SCORE = 150;
    private final int TOP_BREED_SCORE = 100;
    private final int TOP_COLOR_SCORE = 50;
    private final int TOP_GENDER_SCORE = 50;
    private final int TOP_SIZE_SCORE = 75;

    public List<DistancePet> recommendationAlgorithm(Long userID, String userLocation)  {
        // Map of pets and their overall score
        Map<Pet, Integer> petScores = new HashMap<>();

        // Initial list of all pets in the database
        List<Pet> pets = recommendationEngineRepository.findAllNotMatched(userID);

        // Get distances of adoption centers
        Map<Integer, Integer> centerDistances = new HashMap<>();
        if(!userLocation.isEmpty()) {
            centerDistances = getCenterDistances(pets, userLocation);
        }

        // If the user hasn't liked 5 pets yet, recommend randomly
        if(recommendationEngineRepository.findMatchCount(userID) < 5)  {
            List<DistancePet> petsWithDistance = new ArrayList<>();
            for(Pet pet : pets)  {
                DistancePet dp = new DistancePet(pet, -1);
                petsWithDistance.add(dp);
            }
            return petsWithDistance;
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

        return mapPetDistances(recommendedPets, centerDistances);
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

    // finds distance of adoption centers
    public Map<Integer, Integer> getCenterDistances(List<Pet> pets, String userLocation)  {
        // Key: centerId, Value: distance
        Map<Integer, Integer> centerDistances = new HashMap<>();

        for(Pet pet : pets) {
            if(!centerDistances.containsKey(pet.getCenterID())) {
                AdoptionCenter ac = adoptionCenterService.getAdoptionCenter(pet.getCenterID()).getBody();
                assert ac != null;
                String centerLocation = ac.getCenterAddress();
                Integer distance = distanceMatrixService.getDistance(userLocation, centerLocation).getBody();
                centerDistances.put(pet.getCenterID(), distance);
            }
        }
        return centerDistances;
    }

    // Link distance to pet
    public List<DistancePet> mapPetDistances(List<Pet> pets, Map<Integer, Integer> centerDistances)  {
        List<DistancePet> petsWithDistance = new ArrayList<>();
        for(Pet pet : pets)  {
            DistancePet dp;
            dp = new DistancePet(pet, centerDistances.getOrDefault(pet.getCenterID(), -1));
            petsWithDistance.add(dp);
        }
        return petsWithDistance;
    }
}