 import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { createTokenAndSetCookie } from "../utils/createTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (request, response) => {
    const { name, email, password} = request.body;

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
        // throw new Error("Error encoutered: ", error.message);
		response.status(400).json({ success: false, message: error.message });
    }
}

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
        console.lof("Error in verifying email", error); 
		response.status(500).json({ success: false, message: "Server error" });

    }

}

export const login = async (request, response) => {
    const { email, password} = request.body;

    try {
        const user = await findOne({ email });
        if(!user) {
            return response.status(400).json({ success: false, message: "Invalid credentials"});
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return response.status(400).json({ success: false, message: "Invalid credentials"});
        }

        createTokenAndSetCookie(response, user._id);
        user.lastLogin = new Date.now();
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
        
    }
}

export const logout = async (request, response) => {
    response.clearCookie("authToken");
    response.status(200).json({success: true, message: "Logged out successfully"});
}