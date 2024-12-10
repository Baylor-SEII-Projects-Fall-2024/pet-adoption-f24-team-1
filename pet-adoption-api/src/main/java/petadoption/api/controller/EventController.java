package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.event.Event;
import petadoption.api.event.EventService;
import petadoption.api.event.*;
import petadoption.api.pet.Pet;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
@RequestMapping("/api/events")
@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }
    @GetMapping("/{thecenterID}")
    public List<Event> getAllEvents(@PathVariable Long thecenterID ) {
        System.out.println(eventService.getAllEventsByAdminId(thecenterID));
        return eventService.getAllEventsByAdminId(thecenterID);
    }

    @PostMapping
    public ResponseEntity<Event> addEvent(@RequestBody Event event) {
        Event createdEvent = eventService.saveEvent(event);
        System.out.println("Incoming Event: " + event);

        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Optional<Event> eventOptional = Optional.ofNullable(eventService.findEventById(id));

        if (eventOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Event event = eventOptional.get();

        event.setDate(updatedEvent.getDate());
        event.setDescription(updatedEvent.getDescription());
        event.setTitle(updatedEvent.getTitle());
        event.setLocation(updatedEvent.getLocation());

        Event savedEvent = eventService.saveEvent(event);
        return new ResponseEntity<>(savedEvent, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        boolean isRemoved = eventService.deleteEvent(id);
        if (!isRemoved) {
            return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("Event deleted successfully", HttpStatus.OK);
    }
}
