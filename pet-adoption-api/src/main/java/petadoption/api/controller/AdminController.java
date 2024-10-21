package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdmin;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdminRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdoptionCenterAdminRepository adminRepository;

    @Autowired
    AdoptionCenterRepository centerRepository;

    @GetMapping
    public ResponseEntity<List<AdoptionCenterAdmin>> getAllAdmins() {

        List<AdoptionCenterAdmin> admins = adminRepository.findAll();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    @PostMapping("/{centerId}")
    public ResponseEntity<AdoptionCenterAdmin> addAdmin(@PathVariable(value = "centerId") Long centerId, @RequestBody AdoptionCenterAdmin adminRequest) {
        AdoptionCenterAdmin admin = centerRepository.findById(centerId).map(center -> {
            adminRequest.setAdoptionCenter(center);
            return adminRepository.save(adminRequest);
        }).orElseThrow(() -> new RuntimeException("Adoption center not found"));

        return new ResponseEntity<>(admin, HttpStatus.CREATED);
    }
}
