import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { createTokenAndSetCookie } from "../utils/createTokenAndSetCookie.js";
import { sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail, sendForgotPasswordEmail } from "../mailtrap/emails.js";

export const signup = async (request, response) => {
    const { email, password, name} = request.body;

    try {
        if(!name || !email || !password) {
            throw new Error("All fields are required!");
        }

        const userAlreadyExists = await User.findOne({ email });
        console.log("This user already exists.", userAlreadyExists);

        if(userAlreadyExists) {
			return response.status(400).json({ success: false, message: "User already exists!" });
        }

        const hashedPassword = await bcryptjs.hash(password, 12);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiredAt: Date.now() + 16 + 60 * 60 * 1000, // 16 hours
        })

        await user.save();

        //jwt
        createTokenAndSetCookie(response, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        response.status(201).json({
            success: true,
            message: "User created sucessfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
        
    } catch (error) {
		response.status(400).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (request, response) => {
    const {code} = request.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiredAt: { $gt: Date.now() }
        })

        if (!user) {
            return response.status(400).json({success: false, message: "Invalid or expired verification code"})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiredAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        response.status(200).json({
            success: true,
            message: "Email verified successfully",
            user : {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        console.log("Error in verifying email", error); 
		response.status(500).json({ success: false, message: "Server error" });

    }

};

export const login = async (request, response) => {
    const { email, password} = request.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return response.status(400).json({ success: false, message: "Invalid credentials"});
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return response.status(400).json({ success: false, message: "Invalid credentials"});
        }

        createTokenAndSetCookie(response, user._id );
        user.lastLogin = new Date();
        await user.save();

        response.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        
        console.log("Error in logging in", error); 
		response.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (request, response) => {
    response.clearCookie("authToken");
    response.status(200).json({success: true, message: "Logged out successfully"});
};

export const forgotPassword = async (request, response) => {
    const { email } = request.body;

    try {
        const user = await User.findOne({ email: email })

        if (!user) { return response.status(400).json({success: false, message: "User not found"})}

        // generating reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + (1 * 60 * 60 * 1000) //60 mins

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiredAt = resetTokenExpiresAt;

        await user.save();

        
        await sendForgotPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        response.status(200).json({ success: true, message: "Password reset link sent your email" });


    } catch (error) {
        console.log("Error in forgotPassword functionality", error); 
		response.status(400).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (request, response) => {
    try {
        const { password } = request.body;
        const { token } = request.params;
        
        if (!password || !token) {
            return response.status(400).json({ success: false, message: "Password and token are required" });
        }

        const user = await User.findOne({
            resetPasswordToken: token
        });
        
        console.log("Found user with token:", user);
        
        if (!user) {
            console.log("No user found with this token");
            return response.status(400).json({ success: false, message: "Invalid reset token" });
        }
        
        // has token expired?:
        if (user.resetPasswordTokenExpiredAt < Date.now()) {
            console.log("Token expired at:", user.resetPasswordTokenExpiredAt);
            console.log("Current time:", Date.now());
            return response.status(400).json({ success: false, message: "Reset token has expired" });
        }

        const hashedPassword = await bcryptjs.hash(password, 12);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiredAt = undefined;

        await user.save();
        console.log("Password updated successfully for user:", user.email);

        await sendResetSuccessEmail(user.email);
    
        response.status(200).json({ success: true, message: "Password reset successful" });

    } catch (error) {
        console.error("Error in resetPassword functionality:", error); 
        response.status(400).json({ success: false, message: error.message});
    }
};

export const checkAuth = async (request, response) => {
    try {
        const user = await User.findById(request.userId).select("-password"); //used to avoid defining password in response
        if (!user) { 
            return response.status(400).json({success: false, message: "User not found"})
        }

        response.status(200).json({ success: true, user });

    } catch (error) {
        console.error("Error in checkAuth functionality:", error); 
        response.status(400).json({ success: false, message: error.message});
    }
}
