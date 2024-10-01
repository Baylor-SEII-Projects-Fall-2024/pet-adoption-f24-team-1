package petadoption.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public User register(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmailAddress()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();
        user.setEmail(userDTO.getEmailAddress());
        user.setPassword(userDTO.getPassword());
        user.setUserType(userDTO.getUserType());

        return userRepository.save(user);
    }

    public User login(LoginDTO loginDTO) {
        Optional<User> userOptional = userRepository.findByEmail(loginDTO.getEmailAddress());
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(loginDTO.getPassword())) {
            return userOptional.get();
        }
        throw new RuntimeException("Invalid username or password");
    }
}
