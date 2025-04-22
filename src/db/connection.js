import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(`Error: ${error.message}`,"db not connected");
        process.exit(1);
    }
}


export default connectDB;