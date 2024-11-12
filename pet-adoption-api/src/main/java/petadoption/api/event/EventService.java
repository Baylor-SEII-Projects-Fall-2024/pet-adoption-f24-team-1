package petadoption.api.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.pet.Pet;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    public List<Event> getAllEventsByAdminId(Long adminID) {
        return eventRepository.findAllByAdminID(adminID);
    }

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public Optional<Event> findEventById(Long id) {
        return eventRepository.findById(id);
    }

    public boolean deleteEvent(Long id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            eventRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
