package petadoption.api.adoptioncenter;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdoptionCenterService {

    @Autowired
    private AdoptionCenterRepository adoptionCenterRepository;

    public ResponseEntity<List<AdoptionCenter>> getAllCenters() {
        List<AdoptionCenter> centers = new ArrayList<>();

        adoptionCenterRepository.findAll().forEach(centers::add);

        return new ResponseEntity<>(centers, HttpStatus.OK);
    }

    public ResponseEntity<AdoptionCenter> getAdoptionCenter(int id)  {
        Optional<AdoptionCenter> center = adoptionCenterRepository.findById(Long.valueOf(id));
        return center
                .map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<AdoptionCenter> addCenter(AdoptionCenter adoptionCenter) {
        AdoptionCenter center = new AdoptionCenter();

        center.setCenterName(adoptionCenter.getCenterName());
        center.setCenterAddress(adoptionCenter.getCenterAddress());
        center.setCenterPhone(adoptionCenter.getCenterPhone());
        center.setCenterEmail(adoptionCenter.getCenterEmail());

        adoptionCenterRepository.save(center);

        return new ResponseEntity<>(center, HttpStatus.OK);
    }

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {
            // Create and initialize AdoptionCenter objects using setters
            AdoptionCenter shelter1 = new AdoptionCenter();
            shelter1.setCenterName("Animal Shelter 1");
            shelter1.setCenterAddress("123 Dog St");
            shelter1.setCenterPhone("123-456-7890");
            shelter1.setCenterEmail("contact@animalshelter1.com");
            shelter1.setZipCode(12345);
            shelter1.setCenterImageUrl("https://example.com/images/animal-shelter-1.jpg");

            AdoptionCenter shelter2 = new AdoptionCenter();
            shelter2.setCenterName("Happy Paws Adoption");
            shelter2.setCenterAddress("456 Cat Ave");
            shelter2.setCenterPhone("987-654-3210");
            shelter2.setCenterEmail("info@happypawsadoption.com");
            shelter2.setZipCode(67890);
            shelter2.setCenterImageUrl("https://example.com/images/happy-paws.jpg");

            AdoptionCenter shelter3 = new AdoptionCenter();
            shelter3.setCenterName("Paws and Claws");
            shelter3.setCenterAddress("789 Pet Rd");
            shelter3.setCenterPhone("555-555-5555");
            shelter3.setCenterEmail("contact@pawsandclaws.com");
            shelter3.setZipCode(10112);
            shelter3.setCenterImageUrl("https://example.com/images/paws-and-claws.jpg");

            // Save the created centers to the repository
            adoptionCenterRepository.save(shelter1);
            adoptionCenterRepository.save(shelter2);
            adoptionCenterRepository.save(shelter3);
        };
    }

}
