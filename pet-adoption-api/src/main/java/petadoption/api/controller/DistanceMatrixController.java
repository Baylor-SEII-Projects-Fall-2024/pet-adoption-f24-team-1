package petadoption.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import petadoption.api.distanceMatrix.DistanceMatrixResponse;

@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
@RestController
@RequestMapping("api/distance")
public class DistanceMatrixController {

    private final String GOOGLE_API_KEY = "Google API"; // Replace with your API Key

    @GetMapping
    public ResponseEntity<Integer> getDistance(@RequestParam String origin, @RequestParam String destination) {

        String url = String.format(
            "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=%s&destinations=%s&key=%s",
            origin, destination, GOOGLE_API_KEY
        );

        RestTemplate restTemplate = new RestTemplate();
        try {
            // Send GET request to Google Distance Matrix API
            DistanceMatrixResponse response = restTemplate.getForObject(url, DistanceMatrixResponse.class);
            Integer distance = response.getRows().get(0).getElements().get(0).getDistance().getValue();
            distance = (distance / 1000);
            return ResponseEntity.ok(distance);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
