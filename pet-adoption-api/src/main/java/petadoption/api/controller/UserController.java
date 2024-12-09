package petadoption.api.controller;

import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import petadoption.api.dto.LoginUpdateDTO;
import petadoption.api.user.User;
import petadoption.api.user.UserService;
import petadoption.api.userpreference.UserPreference;

import java.util.*;

@Log4j2
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/{id}")
    public User findUserById(@PathVariable Long id) {
        var user = userService.findUser(id).orElse(null);

        if (user == null) {
            log.warn("User not found");
        }

        return user;
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updateUser) {
        Optional<User> userOptional = userService.findUser(id);

        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        User existingUser = userOptional.get();

        existingUser.setFirstName(updateUser.getFirstName());
        existingUser.setLastName(updateUser.getLastName());
        existingUser.setEmail(updateUser.getEmail());
        existingUser.setPhone(updateUser.getPhone());
        existingUser.setBio(updateUser.getBio());
        existingUser.setImgUrl(updateUser.getImgUrl());

        User savedUser = userService.saveUser(existingUser);

        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }


    @PutMapping("/{userId}/preferences")
    public ResponseEntity<String> updateUserPreferences(
            @PathVariable Long userId,
            @RequestBody UserPreference userPreference) {

        User updatedUser = userService.updateUserPreferences(userId, userPreference);
        return new ResponseEntity<>("User preference update success!", HttpStatus.OK);
    }

    @GetMapping("/allusers")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @PutMapping("/{id}/login")
    public ResponseEntity<String> updateLoginInfo(@PathVariable Long id, @Valid @RequestBody LoginUpdateDTO loginUpdateRequest) {
        Optional<User> userOptional = userService.findUser(id);

        if (userOptional.isEmpty()) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();

        // Validate current password
        if (!passwordEncoder.matches(loginUpdateRequest.getCurrentPassword(), user.getPassword())) {
            return new ResponseEntity<>("Invalid current password", HttpStatus.UNAUTHORIZED);
        }

        // Update email if provided
        if (loginUpdateRequest.getNewEmail() != null && !loginUpdateRequest.getNewEmail().isBlank()) {
            // Check if email is already taken
            if (userService.emailExists(loginUpdateRequest.getNewEmail())) {
                return new ResponseEntity<>("Email already in use", HttpStatus.CONFLICT);
            }
            user.setEmail(loginUpdateRequest.getNewEmail());
        }

        // Update password if provided
        if (loginUpdateRequest.getNewPassword() != null && !loginUpdateRequest.getNewPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(loginUpdateRequest.getNewPassword()));
        }

        // Save updated user to the database
        userService.saveUser(user);

        return new ResponseEntity<>("Login information updated successfully", HttpStatus.OK);
    }

//    @CrossOrigin(origins = "http://localhost:3000")
//    @PostMapping("/api/register")
//    public ResponseEntity<User> register(@RequestBody UserDTO userDTO) {
//        return ResponseEntity.ok(userService.register(userDTO));
//    }
}

