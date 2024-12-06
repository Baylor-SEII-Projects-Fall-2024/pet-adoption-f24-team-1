package petadoption.api.adoptioncenteradmin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;
import petadoption.api.dto.LoginDTO;

import java.util.List;
import java.util.Optional;

@Service
public class AdoptionCenterAdminService {

    @Autowired
    private AdoptionCenterAdminRepository adminRepository;

    public ResponseEntity<AdoptionCenterAdmin> getAdmin(Long id) {
        Optional<AdoptionCenterAdmin> admin = adminRepository.findById(id);
        if (admin.isPresent()) {
            return new ResponseEntity<>(admin.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<List<AdoptionCenterAdmin>> getAllAdmins() {
        List<AdoptionCenterAdmin> admins = adminRepository.findAll();
        return new ResponseEntity<>(admins, HttpStatus.OK);
    }

    public ResponseEntity<AdoptionCenter> getAdoptionCenter(Long id)  {
        Optional<AdoptionCenterAdmin> adminOptional = adminRepository.findById(id);
        if(adminOptional.isPresent()) {
            return new ResponseEntity<>(adminOptional.get().getAdoptionCenter(), HttpStatus.OK);
        }
        throw new RuntimeException("Adoption center not found");
    }
}
