package petadoption.api.Recommendation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import petadoption.api.userPetLike.userPetLike;

import java.util.List;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {

    // Find all liked pets for a specific user
    List<userPetLike> findByUserId(Long userId);

    // Find all users who liked a specfic pet
    List<userPetLike> findByPetId(Long petId);

    // Find all pets liked by users who liked a specific pet (if needed)
    List<userPetLike> findByPetIdIn(List<Long> petIds);

}
