package petadoption.api.user;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.userpreference.UserPreference;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findUser(Long userId) {
        return userRepository.findById(userId);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers()  {
        return userRepository.findAll();
    }

    public User updateUserPreferences(Long userId, UserPreference newPreferences) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

        user.getUserPreference().setPreferredSpecies(newPreferences.getPreferredSpecies());
        user.getUserPreference().setPreferredBreed(newPreferences.getPreferredBreed());
        user.getUserPreference().setPreferredGender(newPreferences.getPreferredGender());
        user.getUserPreference().setPreferredSize(newPreferences.getPreferredSize());
        user.getUserPreference().setAgeMin(newPreferences.getAgeMin());
        user.getUserPreference().setAgeMax(newPreferences.getAgeMax());

        return userRepository.save(user);
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
