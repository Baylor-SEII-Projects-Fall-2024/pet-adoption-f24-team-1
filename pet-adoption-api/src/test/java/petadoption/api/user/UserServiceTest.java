package petadoption.api.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import java.util.List;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindUser() {
        Long userId = 1L;
        User user = new User();
        user.setId(userId);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.findUser(userId);
        assertTrue(foundUser.isPresent());
        assertEquals(userId, foundUser.get().getId());

        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void testSaveUser() {
        User user = new User();
        user.setEmail("test@example.com");
        when(userRepository.save(user)).thenReturn(user);

        User savedUser = userService.saveUser(user);
        assertEquals("test@example.com", savedUser.getEmail());

        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testFindAllUsers() {
        User user1 = new User();
        User user2 = new User();
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        List<User> users = userService.findAllUsers();
        assertEquals(2, users.size());

        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testRegister_NewUser() {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("new@example.com");
        userDTO.setPassword("password");
        userDTO.setUserType("admin");

        when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(Optional.empty());

        User newUser = new User();
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(userDTO.getPassword());
        newUser.setUserType(userDTO.getUserType());
        when(userRepository.save(any(User.class))).thenReturn(newUser);

        User registeredUser = userService.register(userDTO);

        assertEquals("new@example.com", registeredUser.getEmail());
        assertEquals("password", registeredUser.getPassword());
        assertEquals("admin", registeredUser.getUserType());

        verify(userRepository, times(1)).findByEmail(userDTO.getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testRegister_EmailAlreadyExists() {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("exists@example.com");

        when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(Optional.of(new User()));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.register(userDTO);
        });

        assertEquals("Email already exists!", exception.getMessage());
        verify(userRepository, times(1)).findByEmail(userDTO.getEmail());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testLogin_Success() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUsername("login@example.com");
        loginDTO.setPassword("password");

        User user = new User();
        user.setEmail("login@example.com");
        user.setPassword("password");

        when(userRepository.findByEmail(loginDTO.getUsername())).thenReturn(Optional.of(user));

        User loggedInUser = userService.login(loginDTO);
        assertEquals("login@example.com", loggedInUser.getEmail());
        assertEquals("password", loggedInUser.getPassword());

        verify(userRepository, times(1)).findByEmail(loginDTO.getUsername());
    }

    @Test
    void testLogin_InvalidCredentials() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUsername("invalid@example.com");
        loginDTO.setPassword("wrongpassword");

        when(userRepository.findByEmail(loginDTO.getUsername())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.login(loginDTO);
        });

        assertEquals("Invalid username or password", exception.getMessage());
        verify(userRepository, times(1)).findByEmail(loginDTO.getUsername());
    }
}
