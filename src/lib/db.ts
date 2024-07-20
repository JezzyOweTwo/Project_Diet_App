import mongoose from 'mongoose';
import 'dotenv/config';


async function connectDB() {
    const serverurl = process.env.DATABASE_URL;
    await mongoose.connect(serverurl);
}
export default connectDB
