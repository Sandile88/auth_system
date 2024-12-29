import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { createTokenAndSetCookie } from "../utils/createTokenAndSetCookie.js";

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
export const login = async (request, response) => {
    response.send("login route");
}
export const logout = async (request, response) => {
    response.send("logout route");
}