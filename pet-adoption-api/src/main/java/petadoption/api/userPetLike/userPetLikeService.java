package petadoption.api.userPetLike;

import jakarta.persistence.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.pet.Pet;
import petadoption.api.user.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class userPetLikeService {

    @Autowired
    private userPetLikeRepository userPetLikeRepository;

    @Autowired
    private UserRepository userRepository;

    // Add a like from a user for a specific pet
    public void likePet(Long userId, Pet pet){
        // Check if the like already exists
        userPetLike existingLike = userPetLikeRepository.findByUserIdAndPetId(userId, pet.getPetID());
        if(existingLike != null) {
            userPetLike like = new userPetLike();
            like.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
            like.setPet(pet);
            userPetLikeRepository.save(like);
        }
        else {
            throw new RuntimeException("User has already liked this pet.");
        }
    }

    // Retrieve all liked pets for a user
    public List<userPetLike> getLikedPets(Long userId){
        return userPetLikeRepository.findByUserId(userId);
    }

    // Remove a like from a user for a specific pet
    public void unlikePet(Long userId, Long petId){
        userPetLike like = userPetLikeRepository.findByUserIdAndPetId(userId, petId);
        if(like != null){
            userPetLikeRepository.delete(like);
        }
        else{
            throw new RuntimeException("Like not found.");
        }
    }

}
