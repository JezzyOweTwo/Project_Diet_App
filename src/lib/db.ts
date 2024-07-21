// src/lib/db.ts
import mongoose from 'mongoose';
import 'dotenv/config';

async function connectDB(): Promise<void> {
    try {
        const serverUrl = process.env.DATABASE_URL;
        if (!serverUrl) {
            throw new Error('DATABASE_URL is not defined in the environment variables');
        }

        await mongoose.connect(serverUrl);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

export default connectDB;