import 'dotenv/config';
import mongoose from 'mongoose';

// Ensure that the environment variable DB_URL is defined in your .env file
const url = process.env.DB_URL;


const connect = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Mongoose connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connect;
