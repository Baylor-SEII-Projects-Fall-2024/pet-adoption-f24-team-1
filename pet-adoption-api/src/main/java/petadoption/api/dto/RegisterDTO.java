package petadoption.api.dto;
import lombok.Data;

@Data
public class RegisterDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String bio;
    private String phone;
    private String location;
    private String imgUrl;

    private String preferredSpecies;
    private String preferredBreed;
    private String preferredGender;
    private String preferredSize;
    private Integer ageMin;
    private Integer ageMax;
}
