import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error connecting to DB", error)
        process.exit(1);
    }
}