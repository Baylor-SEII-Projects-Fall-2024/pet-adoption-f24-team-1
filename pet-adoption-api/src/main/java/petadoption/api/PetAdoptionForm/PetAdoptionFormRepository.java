package petadoption.api.PetAdoptionForm; // Ensure the package name matches

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Use the correct class name with proper casing


@Repository
public interface PetAdoptionFormRepository extends JpaRepository<PetAdoptionForm, Long> {
    // You can define custom query methods here if needed
}
