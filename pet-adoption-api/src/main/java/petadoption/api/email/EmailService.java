package petadoption.api.email;

import org.simplejavamail.api.email.Email;
import org.simplejavamail.api.mailer.config.TransportStrategy;
import org.simplejavamail.email.*;
import org.simplejavamail.mailer.MailerBuilder;
//import org.simplejavamail.email.EmailBuilder;
//import org.simplejavamail.mailer.Mailer;
//import org.simplejavamail.mailer.MailerBuilder;
//import org.simplejavamail.mailer.config.TransportStrategy;


public class EmailService {
    static void builderBuildAndSend(Email email){
        try {
            MailerBuilder
                    .withSMTPServer("mail.smtp2go.com",
                            2525,
                            "nicholas_nolen1@baylor.edu",
                            "xltlHLbGWIM6Q6iB")
                    .withTransportStrategy(TransportStrategy.SMTP_TLS)
                    .buildMailer()
                    .sendMail(email);
        }catch(Exception ignored){
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
    static Email constructRequest(String message, String emailRecipient, String emailAddress){
        return EmailBuilder.startingBlank()
                .from( "Furry Friends Mailer System"
                        , "nicholas_nolen1@baylor.edu")
                .to(emailRecipient, emailAddress)
                .withSubject("Furry Friends Automatic Notification")
                .withPlainText(message)
                .buildEmail();
    }
    public static void sendPetAdoptedAdminNotificationEmail(String requesteeName,String petName,
                                                       String adoptionCenter, String emailAddress ) {
        String message;
        message = "A user has requested to adopt a pet!\n";
        message += requesteeName + " wants to adopt " + petName + "\n";
        message += "Please accept or deny this request in you account portal.\n";

        // Constructing the email message
        Email email = constructRequest(message, adoptionCenter, emailAddress);
        // Sending the email using SMTP
        builderBuildAndSend(email);
        System.out.println("Adoption Notification Email Sent");
    }
    public static void sendUserRegistrationEmail(String emailRecipient, String emailAddress ) {
        String message;
        message = "Thank you for registering for Fluffy Friends "+emailRecipient+ "!\n";
        message += "We hope you find your forever friend!\n";
        // Constructing the email message
        Email email = constructRequest(message, emailRecipient, emailAddress);
        // Sending the email using SMTP
        builderBuildAndSend(email);
        System.out.println("Registration confirmation email sent " + emailAddress);
    }
    public static void sendUserAdoptionConfirmedEmail(String requesteeName, String petName,
                                                 String emailRecipient, String emailAddress ) {
        String message;
        message = "Congratulations, " + requesteeName + ", your request to adopt"
                + petName + " has been approved!\n";
        // Constructing the email message
        Email email = constructRequest(message, emailRecipient, emailAddress);
        // Sending the email using SMTP
        builderBuildAndSend(email);
    }
    public static void sendUserAdoptionDeniedEmail(String requesteeName, String petName,
                                                 String emailRecipient, String emailAddress ) {
        String message;
        message = "Unfortunately, " + requesteeName + ", your request to adopt"
                + petName + " has been Denied!\n";
        message += "We apologize for this inconvenience, feel free to search our website to find the best fit for you!";
        // Constructing the email message
        Email email = constructRequest(message, emailRecipient, emailAddress);
        // Sending the email using SMTP
        builderBuildAndSend(email);
    }

    }
