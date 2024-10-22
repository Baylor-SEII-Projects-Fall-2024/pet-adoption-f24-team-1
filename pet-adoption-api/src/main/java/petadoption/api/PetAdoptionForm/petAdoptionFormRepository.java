package petadoption.api.PetAdoptionForm; // Ensure the package name matches

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Use the correct class name with proper casing
import petadoption.api.PetAdoptionForm.petAdoptionForm;

@Repository
public interface petAdoptionFormRepository extends JpaRepository<petAdoptionForm, Long> {
    // You can define custom query methods here if needed
}
