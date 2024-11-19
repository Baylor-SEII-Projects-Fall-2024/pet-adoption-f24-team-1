package petadoption.api.adoptioncenteradmin;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import petadoption.api.adoptioncenter.AdoptionCenter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdoptionCenterAdminServiceTest {

    @Mock
    private AdoptionCenterAdminRepository adminRepository;

    @InjectMocks
    private AdoptionCenterAdminService adminService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllAdmins_ShouldReturnAllAdmins() {
        // Arrange
        List<AdoptionCenterAdmin> admins = new ArrayList<>();
        admins.add(new AdoptionCenterAdmin());
        admins.add(new AdoptionCenterAdmin());
        when(adminRepository.findAll()).thenReturn(admins);

        // Act
        ResponseEntity<List<AdoptionCenterAdmin>> response = adminService.getAllAdmins();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(admins, response.getBody());
        verify(adminRepository, times(1)).findAll();
    }

    @Test
    void getAdoptionCenter_ShouldReturnAdoptionCenter_WhenAdminExists() {
        // Arrange
        Long adminId = 1L;
        AdoptionCenter adoptionCenter = new AdoptionCenter();
        AdoptionCenterAdmin admin = new AdoptionCenterAdmin();
        admin.setAdoptionCenter(adoptionCenter);
        when(adminRepository.findById(adminId)).thenReturn(Optional.of(admin));

        // Act
        ResponseEntity<AdoptionCenter> response = adminService.getAdoptionCenter(adminId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(adoptionCenter, response.getBody());
        verify(adminRepository, times(1)).findById(adminId);
    }

    @Test
    void getAdoptionCenter_ShouldThrowException_WhenAdminDoesNotExist() {
        // Arrange
        Long adminId = 1L;
        when(adminRepository.findById(adminId)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> adminService.getAdoptionCenter(adminId));
        assertEquals("Adoption center not found", exception.getMessage());
        verify(adminRepository, times(1)).findById(adminId);
    }
}
