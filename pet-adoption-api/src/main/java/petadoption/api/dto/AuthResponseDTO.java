package petadoption.api.dto;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";
    private UserDTO user;

    public AuthResponseDTO(String accessToken, UserDTO user) {
        this.accessToken = accessToken;
        this.user = user;
    }
}
