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

    @GetMapping
    public ResponseEntity<List<AdoptionCenterAdmin>> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/center/{adminId}")
    public ResponseEntity<AdoptionCenter> getAdoptionCenter(@PathVariable(value = "adminId") Long adminId)  {
        return adminService.getAdoptionCenter(adminId);
    }
}
