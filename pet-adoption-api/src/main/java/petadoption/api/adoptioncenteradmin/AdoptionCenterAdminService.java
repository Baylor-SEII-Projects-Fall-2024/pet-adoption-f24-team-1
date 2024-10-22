package petadoption.api.adoptioncenteradmin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;
import petadoption.api.user.LoginDTO;

import java.util.List;
import java.util.Optional;

@Service
public class AdoptionCenterAdminService {

    @Autowired
    private AdoptionCenterAdminRepository adminRepository;

    @Autowired
    private AdoptionCenterRepository centerRepository;

    public ResponseEntity<List<AdoptionCenterAdmin>> getAllAdmins() {
        List<AdoptionCenterAdmin> admins = adminRepository.findAll();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    public ResponseEntity<AdoptionCenterAdmin> registerAdmin(Long centerId,AdoptionCenterAdmin adminRequest) {
        AdoptionCenterAdmin admin = centerRepository.findById(centerId).map(center -> {
            adminRequest.setAdoptionCenter(center);
            return adminRepository.save(adminRequest);
        }).orElseThrow(() -> new RuntimeException("Adoption center not found"));

        return new ResponseEntity<>(admin, HttpStatus.CREATED);
    }

    public AdoptionCenterAdmin loginAdmin(LoginDTO loginDTO) {
        Optional<AdoptionCenterAdmin> adminOptional = adminRepository.findByEmail(loginDTO.getUsername());
        if (adminOptional.isPresent() && adminOptional.get().getPassword().equals(loginDTO.getPassword())) {
            return adminOptional.get();
        }
        throw new RuntimeException("Invalid username or password");
    }
}
