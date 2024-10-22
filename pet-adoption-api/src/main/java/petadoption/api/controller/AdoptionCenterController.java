package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://35.238.40.26:3000"})
@RestController
@RequestMapping("/api/adoptioncenters")
public class AdoptionCenterController {

    @Autowired
    AdoptionCenterRepository adoptionCenterRepository;

    @GetMapping
    public ResponseEntity<List<AdoptionCenter>> getAllCenters() {
        List<AdoptionCenter> centers = new ArrayList<>();

        adoptionCenterRepository.findAll().forEach(centers::add);

        return new ResponseEntity<>(centers, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AdoptionCenter> addCenter(@RequestBody AdoptionCenter adoptionCenter) {
        AdoptionCenter center = new AdoptionCenter();

        center.setCenterName(adoptionCenter.getCenterName());
        center.setCenterAddress(adoptionCenter.getCenterAddress());
        center.setCenterPhone(adoptionCenter.getCenterPhone());
        center.setCenterEmail(adoptionCenter.getCenterEmail());

        adoptionCenterRepository.save(center);

        return new ResponseEntity<>(center, HttpStatus.OK);
    }
}
