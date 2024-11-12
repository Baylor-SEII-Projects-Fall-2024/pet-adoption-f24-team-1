package petadoption.api.adoptioncenter;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import petadoption.api.event.Event;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataInitializer {

    private final AdoptionCenterRepository adoptionCenterRepository;

    @Autowired
    public DataInitializer(AdoptionCenterRepository adoptionCenterRepository) {
        this.adoptionCenterRepository = adoptionCenterRepository;
    }

    @Bean
    public CommandLineRunner loadInitialData() {
        return args -> {
            // Log initialization message
            Logger logger = LoggerFactory.getLogger(DataInitializer.class);
            logger.info("Initializing data...");

            // Clear existing adoption centers and their events
            adoptionCenterRepository.deleteAll();

            // Create adoption centers
            AdoptionCenter center1 = new AdoptionCenter();
            center1.setCenterName("Animal Shelter 3");
            center1.setCenterAddress("123 Dog St");
            center1.setCenterPhone("555-1234");
            center1.setCenterEmail("shelter1@example.com");

            AdoptionCenter center2 = new AdoptionCenter();
            center2.setCenterName("Animal Shelter 4");
            center2.setCenterAddress("456 Cat Ave");
            center2.setCenterPhone("555-5678");
            center2.setCenterEmail("shelter2@example.com");

            // Create events
            Event event1 = new Event();
            event1.setTitle("Adopt-a-thon");
            event1.setDate(LocalDate.of(2024, 12, 1));
            event1.setDescription("Join us for a massive adoption event!");
            event1.setLocation("123 Dog St");
            event1.setImageUrl("https://example.com/event1.jpg");
            event1.setDetailsPage("https://example.com/adopt-a-thon");

            Event event2 = new Event();
            event2.setTitle("Holiday Pet Photos");
            event2.setDate(LocalDate.of(2024, 12, 15));
            event2.setDescription("Holiday photos with adorable pets!");
            event2.setLocation("456 Cat Ave");
            event2.setImageUrl("https://example.com/event2.jpg");
            event2.setDetailsPage("https://example.com/holiday-pet-photos");

            // Associate events with centers
            center1.addEvent(event1); // Adds event1 to center1
            center2.addEvent(event2); // Adds event2 to center2

            // Save all centers and events to the repository (this will overwrite any existing data)
            adoptionCenterRepository.saveAll(List.of(center1, center2));

            logger.info("Database initialized with adoption centers and events.");
        };
    }
}
