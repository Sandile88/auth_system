import { request, response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (request, response, next) => {
    const token = request.cookies.authToken;

    if(!token) {
        return response.status(401).json({ success: false, message: "Unauthorized - no token provided"});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedToken) {
            return response.status(401).json({ success: false, message: "Unauthorized - invalid token"});
        }

        request.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.error("Error in verifyToken functionality:", error); 
        response.status(500).json({ success: false, message: "Server error"});
    }
}