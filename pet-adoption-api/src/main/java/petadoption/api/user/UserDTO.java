package petadoption.api.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {
    private String emailAddress;
    private String password;
    private String userType;

}
