package petadoption.api.dto;
import lombok.Data;

// UserDTO without password for returning to frontend
@Data
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String bio;
    private String email;
    private String phone;
    private String role;
}
