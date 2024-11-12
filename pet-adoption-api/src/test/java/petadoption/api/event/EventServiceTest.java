package petadoption.api.event;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private EventService eventService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllEvents() {
        // Arrange
        List<Event> events = new ArrayList<>();
        Event event1 = new Event();
        event1.setEventID(1L);
        event1.setTitle("Adoption Day");
        event1.setDate(LocalDate.now());
        event1.setLocation("Main Center");
        event1.setDescription("A day for pet adoptions");
        event1.setImageUrl("http://example.com/image1.jpg");
        event1.setDetailsPage("http://example.com/details1");

        Event event2 = new Event();
        event2.setEventID(2L);
        event2.setTitle("Pet Meet & Greet");
        event2.setDate(LocalDate.now().plusDays(5));
        event2.setLocation("Community Park");
        event2.setDescription("A fun event to meet pets");
        event2.setImageUrl("http://example.com/image2.jpg");
        event2.setDetailsPage("http://example.com/details2");

        events.add(event1);
        events.add(event2);
        when(eventRepository.findAll()).thenReturn(events);

        // Act
        List<Event> result = eventService.getAllEvents();

        // Assert
        assertEquals(2, result.size());
        verify(eventRepository, times(1)).findAll();
    }

    @Test
    void testSaveEvent() {
        // Arrange
        Event event = new Event();
        event.setEventID(1L);
        event.setTitle("Adoption Day");
        event.setDate(LocalDate.now());
        event.setLocation("Main Center");
        event.setDescription("A day for pet adoptions");
        event.setImageUrl("http://example.com/image1.jpg");
        event.setDetailsPage("http://example.com/details1");
        when(eventRepository.save(event)).thenReturn(event);

        // Act
        Event result = eventService.saveEvent(event);

        // Assert
        assertNotNull(result);
        assertEquals("Adoption Day", result.getTitle());
        verify(eventRepository, times(1)).save(event);
    }

    @Test
    void testFindEventById() {
        // Arrange
        Event event = new Event();
        event.setEventID(1L);
        event.setTitle("Adoption Day");
        event.setDate(LocalDate.now());
        event.setLocation("Main Center");
        event.setDescription("A day for pet adoptions");
        event.setImageUrl("http://example.com/image1.jpg");
        event.setDetailsPage("http://example.com/details1");
        when(eventRepository.findById(1L)).thenReturn(Optional.of(event));

        // Act
        Event result = eventService.findEventById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getEventID());
        assertEquals("Adoption Day", result.getTitle());
        verify(eventRepository, times(1)).findById(1L);
    }

    @Test
    void testFindEventById_NotFound() {
        // Arrange
        when(eventRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Event result = eventService.findEventById(1L);

        // Assert
        assertNull(result);
        verify(eventRepository, times(1)).findById(1L);
    }

    @Test
    void testDeleteEvent() {
        // Arrange
        when(eventRepository.existsById(1L)).thenReturn(true);

        // Act
        boolean result = eventService.deleteEvent(1L);

        // Assert
        assertTrue(result);
        verify(eventRepository, times(1)).existsById(1L);
        verify(eventRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteEvent_NotFound() {
        // Arrange
        when(eventRepository.existsById(1L)).thenReturn(false);

        // Act
        boolean result = eventService.deleteEvent(1L);

        // Assert
        assertFalse(result);
        verify(eventRepository, times(1)).existsById(1L);
        verify(eventRepository, never()).deleteById(1L);
    }
}
