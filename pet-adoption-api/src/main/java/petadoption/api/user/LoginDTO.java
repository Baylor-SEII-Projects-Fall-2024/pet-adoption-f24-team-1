package petadoption.api.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginDTO {
    private String emailAddress;
    private String password;

}
