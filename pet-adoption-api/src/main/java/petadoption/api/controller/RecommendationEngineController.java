package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import petadoption.api.recommendationEngine.RecommendationEngineService;
import petadoption.api.pet.Pet;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://35.238.40.26:3000"})
@RestController
@RequestMapping("api/recommendation")
public class RecommendationEngineController {

    @Autowired
    private RecommendationEngineService recommendationEngineService;

    @GetMapping(value = "/{id}")
    List<Pet> getRecommendedPets(@PathVariable Long id)  {
        return recommendationEngineService.recommendationAlgorithm(id);
    }
}