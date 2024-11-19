package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petadoption.api.recommendationEngine.DistancePet;
import petadoption.api.recommendationEngine.RecommendationEngineService;
import petadoption.api.pet.Pet;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
@RestController
@RequestMapping("api/recommendation")
public class RecommendationEngineController {

    @Autowired
    private RecommendationEngineService recommendationEngineService;

    @GetMapping("/")
    List<DistancePet> getRecommendedPets(@RequestParam Long id, @RequestParam String userLocation)  {
        return recommendationEngineService.recommendationAlgorithm(id, userLocation);
    }
}
