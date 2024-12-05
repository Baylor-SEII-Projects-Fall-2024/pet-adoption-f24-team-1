package petadoption.api.adoptioncenteradmin;

import org.springframework.data.jpa.repository.JpaRepository;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.user.User;

import java.util.Optional;

public interface AdoptionCenterAdminRepository extends JpaRepository<AdoptionCenterAdmin, Long> {
    Optional<AdoptionCenterAdmin> findByEmail(String email);
    Boolean existsByEmail(String email);
    AdoptionCenterAdmin findAdoptionCenterAdminByAdoptionCenter(AdoptionCenter adoptionCenter);
}
