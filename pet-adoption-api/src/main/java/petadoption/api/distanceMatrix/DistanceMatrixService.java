package petadoption.api.distanceMatrix;

import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DistanceMatrixService {

    @Autowired
    private Environment env;

    public ResponseEntity<Integer> getDistance(String origin, String destination) {
        final String GOOGLE_API_KEY = env.getProperty("google.api.key");
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
