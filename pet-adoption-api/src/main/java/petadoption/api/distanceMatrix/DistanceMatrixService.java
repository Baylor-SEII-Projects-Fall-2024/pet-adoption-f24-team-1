package petadoption.api.distanceMatrix;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DistanceMatrixService {

    @Value("${GOOGLE_API_KEY}")
    private String google_api_key;

    public ResponseEntity<Integer> getDistance(String origin, String destination)  {
        String url = String.format(
                "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=%s&destinations=%s&key=%s",
                origin, destination, google_api_key
        );

        RestTemplate restTemplate = new RestTemplate();
        try {
            // Send GET request to Google Distance Matrix API
            DistanceMatrixResponse response = restTemplate.getForObject(url, DistanceMatrixResponse.class);
            assert response != null;
            int distance = response.getRows().getFirst().getElements().getFirst().getDistance().getValue();
            distance = (distance / 1000);
            return ResponseEntity.ok(distance);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(-2);
        }
    }
}
