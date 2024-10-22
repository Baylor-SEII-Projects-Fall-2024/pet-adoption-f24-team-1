package petadoption.api.adoptioncenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdoptionCenterService {

    @Autowired
    private AdoptionCenterRepository adoptionCenterRepository;

    public ResponseEntity<List<AdoptionCenter>> getAllCenters() {
        List<AdoptionCenter> centers = new ArrayList<>();

        adoptionCenterRepository.findAll().forEach(centers::add);

        return new ResponseEntity<>(centers, HttpStatus.OK);
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
}
