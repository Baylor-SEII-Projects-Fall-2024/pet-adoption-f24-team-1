package petadoption.api.PetAdoptionForm;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.List;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PetAdoptionFormServiceTest {

    @Mock
    private petAdoptionFormRepository petAdoptionFormRepository;

    @InjectMocks
    private petAdoptionFormService petAdoptionFormService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSave() {
        petAdoptionForm form = new petAdoptionForm();
        form.setFullName("John Doe");

        when(petAdoptionFormRepository.save(form)).thenReturn(form);

        petAdoptionForm savedForm = petAdoptionFormService.save(form);
        assertEquals("John Doe", savedForm.getFullName());

        verify(petAdoptionFormRepository, times(1)).save(form);
    }

    @Test
    void testFindAll() {
        petAdoptionForm form1 = new petAdoptionForm();
        petAdoptionForm form2 = new petAdoptionForm();
        when(petAdoptionFormRepository.findAll()).thenReturn(Arrays.asList(form1, form2));

        List<petAdoptionForm> forms = petAdoptionFormService.findAll();
        assertEquals(2, forms.size());

        verify(petAdoptionFormRepository, times(1)).findAll();
    }

    @Test
    void testGetAllForms() {
        petAdoptionForm form1 = new petAdoptionForm();
        petAdoptionForm form2 = new petAdoptionForm();
        when(petAdoptionFormRepository.findAll()).thenReturn(Arrays.asList(form1, form2));

        List<petAdoptionForm> forms = petAdoptionFormService.getAllForms();
        assertEquals(2, forms.size());

        verify(petAdoptionFormRepository, times(1)).findAll();
    }
}
