import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB);
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('DB Connection failed:', error);
        process.exit(1);
    }
}

export { connectDB };