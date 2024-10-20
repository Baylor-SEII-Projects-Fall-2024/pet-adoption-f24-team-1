package petadoption.api.userPetLike;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface userPetLikeRepository extends JpaRepository {

    // Find all pets liked by a user
    List<userPetLike> findByUserId(Long userId);

    // Find all users who liked a specific pet
    List<userPetLike> findByPetId(Long petId);

    // Find a secific like by user and pet (if needed)
    userPetLike findByUserIdAndPetId(Long userId, Long petId);


}
