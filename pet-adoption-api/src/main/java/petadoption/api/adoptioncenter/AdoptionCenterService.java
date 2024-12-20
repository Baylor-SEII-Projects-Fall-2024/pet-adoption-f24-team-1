package petadoption.api.adoptioncenter;

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

    public ResponseEntity<AdoptionCenter> getAdoptionCenter(Long id)  {
        Optional<AdoptionCenter> center = adoptionCenterRepository.findById(id);
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

    public AdoptionCenter getAdoptionCenterById(Long centerId) {
        return adoptionCenterRepository.findById(centerId).orElse(null); // Return null if not found
    }

    public AdoptionCenter saveAdoptionCenter(AdoptionCenter adoptionCenter) {
        return adoptionCenterRepository.save(adoptionCenter);
    }
}