package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import petadoption.api.distanceMatrix.DistanceMatrixResponse;
import petadoption.api.distanceMatrix.DistanceMatrixService;

@CrossOrigin(origins = {"http://localhost:3000", "http://35.238.40.26:3000"})
@RestController
@RequestMapping("api/distance")
public class DistanceMatrixController {

    @Autowired
    private DistanceMatrixService distanceMatrixService;

    @GetMapping
    public ResponseEntity<Integer> getDistance(@RequestParam String origin, @RequestParam String destination) {
        return distanceMatrixService.getDistance(origin, destination);
    }
}
