package petadoption.api.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import petadoption.api.pet.Pet;
import petadoption.api.user.LoginDTO;
import petadoption.api.user.User;
import petadoption.api.user.UserDTO;
import petadoption.api.user.UserService;

import java.util.*;

@Log4j2
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://35.238.40.26:3000"})
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

    @PostMapping("/users")
    public User saveUser(@RequestBody User user) {
        System.out.println("in here");
        return userService.saveUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> userOptional = userService.findUser(id);

        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setImgUrl(updatedUser.getImgUrl());

        //should we allow user to change email and password here?
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());

        User savedUser = userService.saveUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @GetMapping("/allusers")
    public List<User> getAllUsers() {
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

