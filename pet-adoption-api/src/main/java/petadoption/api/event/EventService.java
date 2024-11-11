package petadoption.api.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // Fetch all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Save an event
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    // Find event by ID
    public Event findEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    // Delete event
    public boolean deleteEvent(Long id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Initialize some default events using CommandLineRunner
    @Bean
    public CommandLineRunner initEventDatabase() {
        return args -> {
            // Initialize Event objects as before
            Event event1 = new Event();
            event1.setTitle("Adoption Day Extravaganza");
            event1.setDate(LocalDate.of(2024, 11, 20));
            event1.setDescription("Join us for a fun-filled day of adopting your next furry friend. There will be games, food, and adoptable pets looking for their forever homes!");
            event1.setLocation("Animal Shelter 1");
            event1.setImageUrl("https://example.com/images/adoption-day.jpg");
            event1.setDetailsPage("https://example.com/event/adoption-day");

            Event event2 = new Event();
            event2.setTitle("Paws and Claws Fundraiser");
            event2.setDate(LocalDate.of(2024, 12, 15));
            event2.setDescription("Help us raise funds to care for our animals! We'll have a silent auction, music, and light refreshments. Your support makes a difference!");
            event2.setLocation("Happy Paws Adoption");
            event2.setImageUrl("https://example.com/images/fundraiser.jpg");
            event2.setDetailsPage("https://example.com/event/fundraiser");

            Event event3 = new Event();
            event3.setTitle("Pet Wellness Checkup");
            event3.setDate(LocalDate.of(2024, 12, 5));
            event3.setDescription("Bring your pets for a free health checkup! Our veterinarians will be available to check on your pet's health and give advice.");
            event3.setLocation("Paws and Claws");
            event3.setImageUrl("https://example.com/images/pet-wellness.jpg");
            event3.setDetailsPage("https://example.com/event/wellness-checkup");

            // Save events to the repository
            eventRepository.save(event1);
            eventRepository.save(event2);
            eventRepository.save(event3);

            System.out.println("Default events have been initialized.");
        };
    }

}
