package petadoption.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petadoption.api.user.User;
import petadoption.api.user.UserService;

import java.util.List;

@Log4j2
@RestController
public class UserEndpoint {
    @Autowired
    private UserService userService;

    @GetMapping("/users/{id}")
    public User findUserById(@PathVariable Long id) {
        var user = userService.findUser(id).orElse(null);

        if (user == null) {
            log.warn("User not found");
        }

        return user;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/users")
    public User saveUser(@RequestBody User user) {
        System.out.println("in here");
        return userService.saveUser(user);
    }

    @GetMapping("/allusers")
    public List<User> getAllUsers()  {
        return userService.findAllUsers();
    }
}
