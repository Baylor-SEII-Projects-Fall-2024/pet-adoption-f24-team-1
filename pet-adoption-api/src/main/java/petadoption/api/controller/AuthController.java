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
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdmin;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdminRepository;
import petadoption.api.dto.*;
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
    private AdoptionCenterAdminRepository adminRepository;
    private AdoptionCenterRepository centerRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          AdoptionCenterAdminRepository adminRepository, AdoptionCenterRepository centerRepository,
                          PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.centerRepository = centerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("login/user")
    public ResponseEntity<AuthResponseDTO> loginUser(@RequestBody LoginDTO loginDTO) {
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
            userInfo.setId(user.get().getId());
            userInfo.setFirstName(user.get().getFirstName());
            userInfo.setLastName(user.get().getLastName());
            userInfo.setBio(user.get().getBio());
            userInfo.setEmail(user.get().getEmail());
            userInfo.setPhone(user.get().getPhone());
            userInfo.setRole("USER");
        }

        return new ResponseEntity<>(new AuthResponseDTO(token, userInfo), HttpStatus.OK);
    }

    @PostMapping("register/user")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDTO registerDTO) {
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

        // Assign user with user preferences (attributes initially null)
        UserPreference userPreference = new UserPreference();
        user.setUserPreference(userPreference);

        userRepository.save(user);

        return new ResponseEntity<>("User registered success!", HttpStatus.OK);
    }

    @PostMapping("register/admin")
    public ResponseEntity<String> registerAdmin(@RequestBody RegisterAdminDTO registerAdminDTO) {
        if(adminRepository.existsByEmail(registerAdminDTO.getEmail())) {
            return new ResponseEntity<>("Email is taken!", HttpStatus.BAD_REQUEST);
        }

        // Set Admin attributes
        AdoptionCenterAdmin admin = new AdoptionCenterAdmin();
        admin.setEmail(registerAdminDTO.getEmail());
        admin.setPassword(passwordEncoder.encode((registerAdminDTO.getPassword())));
        admin.setFirstName(registerAdminDTO.getFirstName());
        admin.setLastName(registerAdminDTO.getLastName());

        Optional<AdoptionCenter> centerOptional = centerRepository.findById(registerAdminDTO.getCenterId());
        if (centerOptional.isEmpty()) {
            return new ResponseEntity<>("Adoption center id does not exist!", HttpStatus.BAD_REQUEST);
        }
        // Assign Adoption Center with admin
        admin.setAdoptionCenter(centerOptional.get());

        adminRepository.save(admin);

        return  new ResponseEntity<>("Admin registered success!", HttpStatus.OK);
    }
}
