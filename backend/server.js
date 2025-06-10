import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";


dotenv.config(); //to access .env values

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"], credentials: true })); //handles auth

app.use(express.json()); //parsing json bodies in the express app
app.use(cookieParser()); //parsing incoming cookies

app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port ", PORT);
});

