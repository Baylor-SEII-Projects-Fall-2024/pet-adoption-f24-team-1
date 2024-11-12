package petadoption.api.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import petadoption.api.pet.Pet;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Query(" SELECT e FROM Event e WHERE e.centerID = (SELECT ac.centerId FROM AdoptionCenterAdmin aca" +
            " JOIN aca.adoptionCenter ac WHERE aca.id = :centerID)" )
    List<Event> findAllByAdminID(@Param("centerID") Long centerID);
}
