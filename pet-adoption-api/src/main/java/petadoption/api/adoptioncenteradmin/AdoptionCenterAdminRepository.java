package petadoption.api.adoptioncenteradmin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdoptionCenterAdminRepository extends JpaRepository<AdoptionCenterAdmin, Long> {
    Optional<AdoptionCenterAdmin> findByEmail(String email);


}
