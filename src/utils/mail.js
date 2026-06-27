import { text } from "express";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

// SENDING EMAIL
const sendEmail = async (options) => {
  // this is just putting up the branding from mailgen
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.com", //this doesn't exist
    },
  });
  // plaintext is for the case that might the client does not support html
  const emailTextutal = mailGenerator.generatePlaintext(options.mailgenContent);
  // this will generate html
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  // NOW THE SENDING PART
  // this is a transporter object it'll take the email and sent
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });
  // To configure the next story we have to go to nodemailer website

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextutal,
    html: emailHtml,
    // If the client supports the text it will show text
    // If the client supports the html it'll show the html
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed silently, Make sure credentials provided are valid",
    );
    console.error("Error: ", error);
  }
};

// Generating email
const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we'are excited to see you onboard.",
      action: {
        instructions:
          "To verify your email please click on the following button",
        button: {
          color: "#22bc66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help",
    },
  };
};
import { text } from "express";
import Mailgen from "mailgen";

// FOrgot Password
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account",
      action: {
        instructions:
          "To reset your password click on the following button or link",
        button: {
          color: "#22bc66",
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
