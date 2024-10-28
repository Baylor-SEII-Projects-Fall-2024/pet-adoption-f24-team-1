package petadoption.api.dto;
import lombok.Data;
import petadoption.api.userpreference.UserPreference;

// UserDTO without password for returning to frontend
@Data
public class UserDTO {
    private String firstName;
    private String lastName;
    private String bio;
    private String email;
    private String phone;
    private String location;
    private String imgUrl;
    private UserPreference userPreference;
}
