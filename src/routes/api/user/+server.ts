import { json } from "@sveltejs/kit";
import "dotenv/config";
import * as mongoose from "mongoose";
import User from "../../../schemas/user.ts";

import connectDB from "$lib/db.ts";

connectDB();
export async function GET() {
  const users = await User.find();
  return json({ poop: users }, { status: 201 });
}
