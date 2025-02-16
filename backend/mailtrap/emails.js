import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.error("Error sending verification", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: process.env.TEMPLATE_UUID,
            template_variables: {
                company_info_name: "Auth System",
                name: name,
            },
        });

        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error}`);        
    }
}

export const sendForgotPasswordEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Rest",
        })
        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error("Error sending password reset email", error);
        throw new Error(`Error sending password rest email: ${error}`); 
    }

};

export const sendPasswordResetSuccess = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Successfully reset password",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Successful Password Reset",
        });

        console.log("Password reset email sent successfully", response);

    } catch (error) {
        console.error("Error sending password reset success email", error);
        throw new Error(`Error sending password rest success email: ${error}`); 
        
    }
}