package petadoption.api;

import org.simplejavamail.api.email.Email;
import org.simplejavamail.api.mailer.config.TransportStrategy;
import org.simplejavamail.email.*;
import org.simplejavamail.mailer.MailerBuilder;
//import org.simplejavamail.email.EmailBuilder;
//import org.simplejavamail.mailer.Mailer;
//import org.simplejavamail.mailer.MailerBuilder;
//import org.simplejavamail.mailer.config.TransportStrategy;


public class EmailService {
    public static void sendPetAdoptedNotificationEmail(String requesteeName,
                                                       String petName,
                                                       String adoptionCenter,
                                                       String emailAddress ) {
        String message;
        message = "A user has requested to adopt a pet!\n";
        message += requesteeName + " wants to adopt " + petName + "\n";
        message += "Please accept or deny this request in you account portal.\n";

        // Constructing the email message
        Email email = EmailBuilder.startingBlank()
                .from( "Furry Friends Mailer System"
                        , "nicholas_nolen1@baylor.edu")
                .to(adoptionCenter, emailAddress)
                .withSubject("Pet Adoption Request")
                .withPlainText(message)
                .buildEmail();

        // Sending the email using SMTP
        MailerBuilder
                .withSMTPServer("mail.smtp2go.com",
                        2525,
                        "nicholas_nolen1@baylor.edu",
                        "xltlHLbGWIM6Q6iB")
                .withTransportStrategy(TransportStrategy.SMTP_TLS)
                .buildMailer()
                .sendMail(email);
    }
}
