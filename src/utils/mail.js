import { text } from "express";
import Mailgen from "mailgen";

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

export { emailVerificationMailgenContent, forgotPasswordMailgenContent };
