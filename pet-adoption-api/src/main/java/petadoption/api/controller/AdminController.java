package petadoption.api.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdmin;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdminService;
import petadoption.api.dto.LoginUpdateDTO;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdoptionCenterAdminService adminService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @GetMapping("/{adminId}")
    public ResponseEntity<AdoptionCenterAdmin> getAdmin(@PathVariable(value = "adminId") Long adminId) {
        return adminService.getAdmin(adminId);
    }

   ////FIXME: make this use a DTO
    @PutMapping("/{id}")
    public ResponseEntity<AdoptionCenterAdmin> updateAdmin(@PathVariable Long id, @RequestBody AdoptionCenterAdmin updateAdmin) {
        ResponseEntity<AdoptionCenterAdmin> responseEntity = adminService.getAdmin(id);

        if (responseEntity.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        AdoptionCenterAdmin existingAdmin = responseEntity.getBody();
        existingAdmin.setFirstName(updateAdmin.getFirstName());
        existingAdmin.setLastName(updateAdmin.getLastName());
        existingAdmin.setEmail(updateAdmin.getEmail());

        return adminService.saveAdmin(existingAdmin);
    }

    @PutMapping("/{id}/login")
    public ResponseEntity<String> updateLoginInfo(
            @PathVariable Long id,
            @Valid @RequestBody LoginUpdateDTO loginUpdateRequest) {

        // Retrieve the admin using adminService, which returns a ResponseEntity
        ResponseEntity<AdoptionCenterAdmin> adminResponse = adminService.getAdmin(id);

        // Check if the admin was not found
        if (adminResponse.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
            return new ResponseEntity<>("Admin not found", HttpStatus.NOT_FOUND);
        }

        // Extract the admin object from the response
        AdoptionCenterAdmin admin = adminResponse.getBody();
        if (admin == null) {
            return new ResponseEntity<>("Admin data is missing", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // Validate current password
        if (!passwordEncoder.matches(loginUpdateRequest.getCurrentPassword(), admin.getPassword())) {
            return new ResponseEntity<>("Invalid current password", HttpStatus.UNAUTHORIZED);
        }

        // Update email if provided
        if (loginUpdateRequest.getNewEmail() != null && !loginUpdateRequest.getNewEmail().isBlank()) {
            // Check if email is already taken
            if (adminService.emailExists(loginUpdateRequest.getNewEmail())) {
                return new ResponseEntity<>("Email already in use", HttpStatus.CONFLICT);
            }
            admin.setEmail(loginUpdateRequest.getNewEmail());
        }

        // Update password if provided
        if (loginUpdateRequest.getNewPassword() != null && !loginUpdateRequest.getNewPassword().isBlank()) {
            admin.setPassword(passwordEncoder.encode(loginUpdateRequest.getNewPassword()));
        }

        // Save the updated admin to the database
        adminService.saveAdmin(admin);

        return new ResponseEntity<>("Login information updated successfully", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<AdoptionCenterAdmin>> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/center/{adminId}")
    public ResponseEntity<AdoptionCenter> getAdoptionCenter(@PathVariable(value = "adminId") Long adminId)  {
        return adminService.getAdoptionCenter(adminId);
    }
}
