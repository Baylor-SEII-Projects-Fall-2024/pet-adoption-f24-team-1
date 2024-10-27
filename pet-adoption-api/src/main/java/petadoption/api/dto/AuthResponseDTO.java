package petadoption.api.dto;

import lombok.Data;
import petadoption.api.user.User;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";
    private User user;

    public AuthResponseDTO(String accessToken, User user) {
        this.accessToken = accessToken;
        this.user = user;
    }
}
