package com.App.service;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

@Service

public class EmailService {

	public  static boolean sendEmail(String to) {
		System.out.println("Springboot is running......");
         boolean isSend=false;
		String host = "smtp.gmail.com"; // For Gmail
		String port = "587"; // For TLS
		String username = "monisraza2009@gmail.com";
		String password = "alov mihu llhp omxb\n" + ""; // Use App Passwords for Gmail

		// Email details
		String recipient = to;
		String subject = "Confirmation  from Electrowise";
		String messageContent = "Congratulation for your successful registration ";

		// Set properties
		Properties props = new Properties();
		props.put("mail.smtp.host", host);
		props.put("mail.smtp.port", port);
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");

		// Authenticate and send email
		Session session = Session.getInstance(props, new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		try {
			// Create a MimeMessage
			Message message1 = new MimeMessage(session);
			message1.setFrom(new InternetAddress(username));
			message1.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
			message1.setSubject(subject);
			message1.setText(messageContent);

			// Send the email
			Transport.send(message1);
			System.out.println("Email sent successfully!");
			
			isSend=true;

		} catch (MessagingException e) {
			e.printStackTrace();
		}
		
		return  isSend;
	}

}
