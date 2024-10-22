package petadoption.api.PetAdoptionForm;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "petAdoptionForm")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class petAdoptionForm{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fullName;
    private Long licenseNumber;
    private String address;
    private String cityStatZip;
    private String phoneNumber;
    private String email;
    private String employer;

    @Temporal(TemporalType.TIMESTAMP)
    private Date submissionData;
}