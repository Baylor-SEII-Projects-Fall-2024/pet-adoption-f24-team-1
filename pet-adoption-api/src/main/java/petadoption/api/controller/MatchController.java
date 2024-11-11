package petadoption.api.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.matches.Match;
import petadoption.api.matches.MatchService;
import petadoption.api.pet.Pet;

import java.util.List;
import java.util.Optional;

@Log4j2
@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
@RequestMapping("/api/matches")
@RestController
public class MatchController {

    @Autowired
    private MatchService matchService;

    @PostMapping
    public Match addMatch(@RequestBody Match match)  {
        return matchService.addMatch(match);
    }

    @GetMapping
    public List<Pet> getMatches(@RequestParam int userID)  {
        return matchService.getMatches(userID);
    }

    @DeleteMapping
    public void deleteMatch(@RequestBody Match match)  {
        matchService.deleteMatch(match);
    }
}
