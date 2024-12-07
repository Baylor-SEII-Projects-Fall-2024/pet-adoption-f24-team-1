package petadoption.api.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdmin;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdminRepository;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdminService;
import petadoption.api.dto.LoginDTO;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdoptionCenterAdminService adminService;

    @GetMapping("/{adminId}")
    public ResponseEntity<AdoptionCenterAdmin> getAdmin(@PathVariable(value = "adminId") Long adminId) {
        return adminService.getAdmin(adminId);
    }

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

    @GetMapping
    public ResponseEntity<List<AdoptionCenterAdmin>> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/center/{adminId}")
    public ResponseEntity<AdoptionCenter> getAdoptionCenter(@PathVariable(value = "adminId") Long adminId)  {
        return adminService.getAdoptionCenter(adminId);
    }
}
