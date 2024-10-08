package petadoption.api.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.user.LoginDTO;
import petadoption.api.user.User;
import petadoption.api.user.UserDTO;
import petadoption.api.user.UserService;

import java.util.List;

@Log4j2
@RestController
public class UserController {

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

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/allusers")
    public List<User> getAllUsers()  {
        return userService.findAllUsers();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/register")
    public ResponseEntity<User> register(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.register(userDTO));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/login")
    public ResponseEntity<User> login(@RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(userService.login(loginDTO));
    }
}
