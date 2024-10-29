package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import petadoption.api.dto.AuthResponseDTO;
import petadoption.api.dto.LoginDTO;
import petadoption.api.dto.RegisterDTO;
import petadoption.api.dto.UserDTO;
import petadoption.api.security.JWTGenerator;
import petadoption.api.user.User;
import petadoption.api.user.UserRepository;
import petadoption.api.userpreference.UserPreference;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://35.238.40.26:3000"})
public class AuthController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getEmail(),
                        loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println(authentication.getPrincipal());
        String token = jwtGenerator.generateToken(authentication);
        Optional<User> user = userRepository.findByEmail(loginDTO.getEmail());

        UserDTO userInfo = new UserDTO();
        if (user.isPresent()) {
            userInfo.setFirstName(user.get().getFirstName());
            userInfo.setLastName(user.get().getLastName());
            userInfo.setBio(user.get().getBio());
            userInfo.setEmail(user.get().getEmail());
            userInfo.setPhone(user.get().getPhone());
            userInfo.setLocation(user.get().getLocation());
            userInfo.setImgUrl(user.get().getImgUrl());
            userInfo.setUserPreference(user.get().getUserPreference());
        }

        return new ResponseEntity<>(new AuthResponseDTO(token, userInfo), HttpStatus.OK);
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO) {
        // Check if email exists
        if(userRepository.existsByEmail(registerDTO.getEmail())) {
            return new ResponseEntity<>("Email is taken!", HttpStatus.BAD_REQUEST);
        }

        // Set User attributes
        User user = new User();
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode((registerDTO.getPassword())));
        user.setFirstName(registerDTO.getFirstName());
        user.setLastName(registerDTO.getLastName());
        user.setBio("Hi, my name is " + registerDTO.getFirstName() + " " + registerDTO.getLastName() +
                ", and I'm looking for new fluffy friends!");
        user.setPhone(registerDTO.getPhone());
//        user.setLocation(registerDTO.getLocation());
//        user.setImgUrl(registerDTO.getImgUrl());

        // Set UserPreference attributes
        UserPreference userPreference = new UserPreference();
//        userPreference.setPreferredSpecies(registerDTO.getPreferredSpecies());
//        userPreference.setPreferredBreed(registerDTO.getPreferredBreed());
//        userPreference.setPreferredGender(registerDTO.getPreferredGender());
//        userPreference.setPreferredSize(registerDTO.getPreferredSize());
//        userPreference.setAgeMin(registerDTO.getAgeMin());
//        userPreference.setAgeMax(registerDTO.getAgeMax());

        // Assign userId to UserPreference
        user.setUserPreference(userPreference);

        userRepository.save(user);

        return new ResponseEntity<>("User registered success!", HttpStatus.OK);
    }
}
