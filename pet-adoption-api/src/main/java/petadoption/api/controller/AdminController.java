package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenteradmin.AdminDTO;
import petadoption.api.adoptioncenteradmin.AdminService;
import petadoption.api.adoptioncenteradmin.AdoptionCenterAdmin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    public AdoptionCenterAdmin registerAdmin(@RequestBody AdminDTO adminDTO) {
        return adminService.registerAdmin(adminDTO);
    }
}
