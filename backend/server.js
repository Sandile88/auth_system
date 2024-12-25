import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/connectDB.js";


dotenv.config();

const app = express();

app.get("/", (request, result) => {
    result.send("Testing!");

})

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000");
});

