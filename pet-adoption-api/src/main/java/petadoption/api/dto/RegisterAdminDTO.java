package petadoption.api.dto;

import lombok.Data;

@Data
public class RegisterAdminDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Long centerId;
}
