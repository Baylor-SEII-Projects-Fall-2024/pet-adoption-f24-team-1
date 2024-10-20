package petadoption.api.Recommendation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.Recommendation.RecommendationRepository;
import petadoption.api.userPetLike.userPetLike;
import petadoption.api.pet.Pet;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    // Get recommendations for a user based on their liked pets
    public Set<Pet> getRecommendations(Long userId) {
        // Get the liked pets for the user
        List<userPetLike> likedPets = recommendationRepository.findByUserId(userId);

        Set<Pet> recommendations = new HashSet<>();

        // For each liked pet, find other users who liked the same pet
        for (userPetLike like : likedPets) {
            Long petId = like.getPet().getPetID();
            List<userPetLike> likesForPet = recommendationRepository.findByPetId(petId);

            // Find pets liked by those users
            for (userPetLike userLike : likesForPet) {
                if (!userLike.getUser().getId().equals(userId)) {  // Avoid recommending pets the user already liked
                    recommendations.add(userLike.getPet());  // Add the pet to recommendations
                }
            }
        }

        return recommendations;  // Return unique recommended pets
    }
}
