package petadoption.api.dto;

import lombok.Data;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class LoginUpdateDTO {

    @NotBlank(message = "Current password is required")
    private String currentPassword;

    @Email(message = "Invalid email format")
    private String newEmail;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String newPassword;

}

