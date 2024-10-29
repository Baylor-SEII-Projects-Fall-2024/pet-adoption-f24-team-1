package petadoption.api.adoptioncenteradmin;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterRepository;
import petadoption.api.user.LoginDTO;

import java.util.List;
import java.util.Optional;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdoptionCenterAdminServiceTest {

    @Mock
    private AdoptionCenterAdminRepository adminRepository;

    @Mock
    private AdoptionCenterRepository centerRepository;

    @InjectMocks
    private AdoptionCenterAdminService adminService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllAdmins() {
        AdoptionCenterAdmin admin1 = new AdoptionCenterAdmin();
        AdoptionCenterAdmin admin2 = new AdoptionCenterAdmin();
        when(adminRepository.findAll()).thenReturn(Arrays.asList(admin1, admin2));

        ResponseEntity<List<AdoptionCenterAdmin>> response = adminService.getAllAdmins();
        List<AdoptionCenterAdmin> admins = response.getBody();

        assertNotNull(admins);
        assertEquals(2, admins.size());
        assertEquals(HttpStatus.OK, response.getStatusCode());

        verify(adminRepository, times(1)).findAll();
    }

    @Test
    void testRegisterAdmin_Success() {
        Long centerId = 1L;
        AdoptionCenter center = new AdoptionCenter();
        center.setCenterId(centerId);
        AdoptionCenterAdmin adminRequest = new AdoptionCenterAdmin();
        adminRequest.setEmail("admin@example.com");

        when(centerRepository.findById(centerId)).thenReturn(Optional.of(center));
        when(adminRepository.save(adminRequest)).thenReturn(adminRequest);

        ResponseEntity<AdoptionCenterAdmin> response = adminService.registerAdmin(centerId, adminRequest);

        assertNotNull(response.getBody());
        assertEquals("admin@example.com", response.getBody().getEmail());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        verify(centerRepository, times(1)).findById(centerId);
        verify(adminRepository, times(1)).save(adminRequest);
    }

    @Test
    void testRegisterAdmin_CenterNotFound() {
        Long centerId = 1L;
        AdoptionCenterAdmin adminRequest = new AdoptionCenterAdmin();

        when(centerRepository.findById(centerId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            adminService.registerAdmin(centerId, adminRequest);
        });

        assertEquals("Adoption center not found", exception.getMessage());
        verify(centerRepository, times(1)).findById(centerId);
        verify(adminRepository, never()).save(any(AdoptionCenterAdmin.class));
    }

    @Test
    void testLoginAdmin_Success() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUsername("admin@example.com");
        loginDTO.setPassword("password");

        AdoptionCenterAdmin admin = new AdoptionCenterAdmin();
        admin.setEmail("admin@example.com");
        admin.setPassword("password");

        when(adminRepository.findByEmail(loginDTO.getUsername())).thenReturn(Optional.of(admin));

        AdoptionCenterAdmin loggedInAdmin = adminService.loginAdmin(loginDTO);

        assertNotNull(loggedInAdmin);
        assertEquals("admin@example.com", loggedInAdmin.getEmail());
        assertEquals("password", loggedInAdmin.getPassword());

        verify(adminRepository, times(1)).findByEmail(loginDTO.getUsername());
    }

    @Test
    void testLoginAdmin_InvalidCredentials() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUsername("admin@example.com");
        loginDTO.setPassword("wrongpassword");

        when(adminRepository.findByEmail(loginDTO.getUsername())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            adminService.loginAdmin(loginDTO);
        });

        assertEquals("Invalid username or password", exception.getMessage());
        verify(adminRepository, times(1)).findByEmail(loginDTO.getUsername());
    }
}
