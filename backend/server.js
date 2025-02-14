import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/connectDB.js";
import authRoutes from "./routes/auth.route.js";


dotenv.config(); //to access.env values

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); //parsing json bodies in the express app


app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port ", PORT);
});

