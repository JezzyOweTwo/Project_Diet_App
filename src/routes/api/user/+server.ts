import { json } from '@sveltejs/kit';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import User from '../../../schemas/user.ts'
const serverurl = process.env.DATABASE_URL; 
await mongoose.connect(serverurl);

export async function GET() {
    const users = await User.find();
	return json({ "poop":users }, { status: 201 });
}