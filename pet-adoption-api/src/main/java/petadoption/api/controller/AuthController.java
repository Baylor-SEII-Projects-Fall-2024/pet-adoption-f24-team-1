package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import petadoption.api.dto.AuthResponseDTO;
import petadoption.api.dto.LoginDTO;
import petadoption.api.dto.RegisterDTO;
import petadoption.api.security.JWTGenerator;
import petadoption.api.user.User;
import petadoption.api.user.UserRepository;
import petadoption.api.userpreference.UserPreference;

@RestController
@RequestMapping("/api/auth")
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
        System.out.println(1);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
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
        user.setBio(registerDTO.getBio());
        user.setPhone(registerDTO.getPhone());
        user.setLocation(registerDTO.getLocation());
        user.setImgUrl(registerDTO.getImgUrl());

        // Set UserPreference attributes
        UserPreference userPreference = new UserPreference();
        userPreference.setPreferredSpecies(registerDTO.getPreferredSpecies());
        userPreference.setPreferredBreed(registerDTO.getPreferredBreed());
        userPreference.setPreferredGender(registerDTO.getPreferredGender());
        userPreference.setPreferredSize(registerDTO.getPreferredSize());
        userPreference.setAgeMin(registerDTO.getAgeMin());
        userPreference.setAgeMax(registerDTO.getAgeMax());

        // Assign userId to UserPreference
        user.setUserPreference(userPreference);

        userRepository.save(user);

        return new ResponseEntity<>("User registered success!", HttpStatus.OK);
    }
}
