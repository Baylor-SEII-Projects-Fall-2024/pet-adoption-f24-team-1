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
            Event event3 = new Event();
            event3.setTitle("Pet Adoption Fair");
            event3.setDate(LocalDate.of(2024, 11, 5));
            event3.setDescription("Find your new furry friend at our Adoption Fair!");
            event3.setLocation("123 Dog St");
            event3.setImageUrl("https://example.com/event3.jpg");
            event3.setDetailsPage("https://example.com/pet-adoption-fair");

            Event event4 = new Event();
            event4.setTitle("Puppy Playdate");
            event4.setDate(LocalDate.of(2024, 11, 20));
            event4.setDescription("Bring your puppy to meet others and have fun!");
            event4.setLocation("456 Cat Ave");
            event4.setImageUrl("https://example.com/event4.jpg");
            event4.setDetailsPage("https://example.com/puppy-playdate");

            Event event5 = new Event();
            event5.setTitle("Kitten Shower");
            event5.setDate(LocalDate.of(2024, 12, 10));
            event5.setDescription("Celebrate our adorable kittens ready for adoption!");
            event5.setLocation("123 Dog St");
            event5.setImageUrl("https://example.com/event5.jpg");
            event5.setDetailsPage("https://example.com/kitten-shower");

            Event event6 = new Event();
            event6.setTitle("Pet Adoption Meet-and-Greet");
            event6.setDate(LocalDate.of(2024, 12, 20));
            event6.setDescription("Meet our pets available for adoption in a relaxed setting.");
            event6.setLocation("456 Cat Ave");
            event6.setImageUrl("https://example.com/event6.jpg");
            event6.setDetailsPage("https://example.com/pet-adoption-meet-and-greet");

            center1.addEvent(event1);
            center1.addEvent(event3); // Adds event3 to center1
            center1.addEvent(event5); // Adds event5 to center1
            center2.addEvent(event2);
            center2.addEvent(event4); // Adds event4 to center2
            center2.addEvent(event6); // Adds event6 to center2

            adoptionCenterRepository.saveAll(List.of(center1, center2));

            logger.info("Database initialized with updated adoption centers and events.");

        };
    }
}