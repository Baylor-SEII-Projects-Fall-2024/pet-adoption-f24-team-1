package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterService;
import petadoption.api.event.Event;
import petadoption.api.event.EventService;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://35.238.40.26:3000"})
@RestController
@RequestMapping("/api/adoptioncenters")
public class AdoptionCenterController {

    @Autowired
    private AdoptionCenterService adoptionCenterService;

    @Autowired
    private EventService eventService;  // Add EventService to retrieve events

    // Existing methods

    @GetMapping
    public ResponseEntity<List<AdoptionCenter>> getAllCenters() {
        return adoptionCenterService.getAllCenters();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<AdoptionCenter> getAdoptionCenter(@PathVariable int id) {
        return adoptionCenterService.getAdoptionCenter(id);
    }

    @PostMapping
    public ResponseEntity<AdoptionCenter> addCenter(@RequestBody AdoptionCenter adoptionCenter) {
        return adoptionCenterService.addCenter(adoptionCenter);
    }

    // New method to get events for a specific adoption center
    @GetMapping("/{centerId}/events")
    public ResponseEntity<List<Event>> getEventsByAdoptionCenter(@PathVariable Long centerId) {
        // Fetch AdoptionCenter using the centerId
        AdoptionCenter adoptionCenter = adoptionCenterService.getAdoptionCenterById(centerId);

        if (adoptionCenter == null) {
            return ResponseEntity.notFound().build();  // Return 404 if Adoption Center not found
        }

        // Get the list of events associated with this adoption center
        List<Event> events = adoptionCenter.getEvents();

        // Return 200 OK with an empty list if no events are found
        return ResponseEntity.ok(events);  // This ensures an empty list is returned with 200 OK
    }
}
