package petadoption.api.matches;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petadoption.api.pet.Pet;

import java.util.List;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    public Match addMatch(Match match)  {
        return matchRepository.save(match);
    }

    public List<Pet> getMatches(int userID)  {
        return matchRepository.getMatchedPets(userID);
    }

    public void deleteMatch(Match match)  {
        List<Match> matches = matchRepository.findByUserIDAndPetID(match.getUserID(), match.getPetID());
        matchRepository.deleteAll(matches);
    }
}
