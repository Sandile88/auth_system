import jwt from "jsonwebtoken";

export const createTokenAndSetCookie = (response, userId)=> {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    response.cookie("authToken", token, {
        httpOnly: true,
        secure:process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return token;
}