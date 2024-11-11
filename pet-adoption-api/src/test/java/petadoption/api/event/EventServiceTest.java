package petadoption.api.event;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EventServiceTest {

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
        Event event1 = new Event();
        Event event2 = new Event();
        when(eventRepository.findAll()).thenReturn(Arrays.asList(event1, event2));

        List<Event> events = eventService.getAllEvents();
        assertEquals(2, events.size());

        verify(eventRepository, times(1)).findAll();
    }

    @Test
    void testSaveEvent() {
        Event event = new Event();
        event.setTitle("Adoption Day");

        when(eventRepository.save(event)).thenReturn(event);

        Event savedEvent = eventService.saveEvent(event);
        assertEquals("Adoption Day", savedEvent.getTitle());

        verify(eventRepository, times(1)).save(event);
    }

    @Test
    void testFindEventById_Present() {
        Long eventId = 1L;
        Event event = new Event();
        event.setEventID(eventId);
        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));

        Optional<Event> foundEvent = Optional.ofNullable(eventService.findEventById(eventId));
        assertTrue(foundEvent.isPresent());
        assertEquals(eventId, foundEvent.get().getEventID());

        verify(eventRepository, times(1)).findById(eventId);
    }

    @Test
    void testFindEventById_NotPresent() {
        Long eventId = 1L;
        when(eventRepository.findById(eventId)).thenReturn(Optional.empty());

        Optional<Event> foundEvent = Optional.ofNullable(eventService.findEventById(eventId));
        assertFalse(foundEvent.isPresent());

        verify(eventRepository, times(1)).findById(eventId);
    }

    @Test
    void testDeleteEvent_Present() {
        Long eventId = 1L;
        Event event = new Event();
        when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));

        boolean isDeleted = eventService.deleteEvent(eventId);
        assertTrue(isDeleted);

        verify(eventRepository, times(1)).findById(eventId);
        verify(eventRepository, times(1)).deleteById(eventId);
    }

    @Test
    void testDeleteEvent_NotPresent() {
        Long eventId = 1L;
        when(eventRepository.findById(eventId)).thenReturn(Optional.empty());

        boolean isDeleted = eventService.deleteEvent(eventId);
        assertFalse(isDeleted);

        verify(eventRepository, times(1)).findById(eventId);
        verify(eventRepository, never()).deleteById(eventId);
    }
}
