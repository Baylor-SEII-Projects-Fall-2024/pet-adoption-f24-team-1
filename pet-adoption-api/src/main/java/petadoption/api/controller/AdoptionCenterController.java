package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterService;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
@RestController
@RequestMapping("/api/adoptioncenters")
public class AdoptionCenterController {

    @Autowired
    private AdoptionCenterService adoptionCenterService;

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
}
