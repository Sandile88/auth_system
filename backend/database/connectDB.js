import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("uri: ", process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected: ${conn.connection.host}`);
        
    } catch (err) {
        console.log("Database error connection: ", err.message); 
        process.exit(1); // exiting with failure  
    }
};