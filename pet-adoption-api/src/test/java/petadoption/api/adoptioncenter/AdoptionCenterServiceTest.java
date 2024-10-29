package petadoption.api.adoptioncenter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdoptionCenterServiceTest {

    @Mock
    private AdoptionCenterRepository adoptionCenterRepository;

    @InjectMocks
    private AdoptionCenterService adoptionCenterService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllCenters() {
        List<AdoptionCenter> centers = new ArrayList<>();
        AdoptionCenter center1 = new AdoptionCenter();
        AdoptionCenter center2 = new AdoptionCenter();
        centers.add(center1);
        centers.add(center2);

        when(adoptionCenterRepository.findAll()).thenReturn(centers);

        ResponseEntity<List<AdoptionCenter>> response = adoptionCenterService.getAllCenters();
        List<AdoptionCenter> resultCenters = response.getBody();

        assertNotNull(resultCenters);
        assertEquals(2, resultCenters.size());
        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(adoptionCenterRepository, times(1)).findAll();
    }

    @Test
    void testAddCenter() {
        AdoptionCenter adoptionCenter = new AdoptionCenter();
        adoptionCenter.setCenterName("Happy Tails Center");
        adoptionCenter.setCenterAddress("1234 Bark Street");
        adoptionCenter.setCenterPhone("555-1234");
        adoptionCenter.setCenterEmail("happytails@example.com");

        when(adoptionCenterRepository.save(any(AdoptionCenter.class))).thenReturn(adoptionCenter);

        ResponseEntity<AdoptionCenter> response = adoptionCenterService.addCenter(adoptionCenter);

        assertNotNull(response.getBody());
        assertEquals("Happy Tails Center", response.getBody().getCenterName());
        assertEquals("1234 Bark Street", response.getBody().getCenterAddress());
        assertEquals("555-1234", response.getBody().getCenterPhone());
        assertEquals("happytails@example.com", response.getBody().getCenterEmail());
        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(adoptionCenterRepository, times(1)).save(any(AdoptionCenter.class));
    }
}
