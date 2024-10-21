package petadoption.api.adoptioncenteradmin;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;

@Service
public class AdminService {

    @Autowired
    AdoptionCenterAdminRepository adoptionCenterAdminRepository;

    @Autowired
    AdoptionCenterRepository adoptionCenterRepository;

    @Transactional
    public AdoptionCenterAdmin registerAdmin(AdminDTO adminDTO) {
        if (adoptionCenterAdminRepository.findByEmail(adminDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        // Create new admin
        AdoptionCenterAdmin admin = new AdoptionCenterAdmin();
        admin.setFirstName(adminDTO.getFirstName());
        admin.setLastName(adminDTO.getLastName());
        admin.setEmail(adminDTO.getEmail());
        admin.setPassword(adminDTO.getPassword());

        // Create new adoption center
        AdoptionCenter adoptionCenter = new AdoptionCenter();
        adoptionCenter.setName(adminDTO.getCenterName());
        System.out.println(adminDTO.getCenterAddress());
        adoptionCenter.setAddress(adminDTO.getCenterAddress());
        adoptionCenter.setPhone(adminDTO.getCenterPhone());
        adoptionCenter.setEmail(adminDTO.getCenterEmail());
        adoptionCenter.setAdmin(admin);

        System.out.println(adoptionCenter.getAddress());

        // Associate admin with adoption center
        admin.setAdoptionCenter(adoptionCenter);

        return adoptionCenterAdminRepository.save(admin);
    }
}
