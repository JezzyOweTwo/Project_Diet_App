import { json } from "@sveltejs/kit";
import bcrypt from "bcryptjs";
import connectDB from "$lib/db";
import User from "../../../../schemas/user";

connectDB().catch((error) => console.log("Database connection error:", error));

export async function POST({ request }: { request: Request }) {
  const { email, password } = await request.json();
  console.log(email, password);

  const user = await User.findOne({ email });
  console.log(user);

  if (user && (await bcrypt.compare(password, user.password))) {
    return json({ message: "Login successful", user }, { status: 200 });
  } else {
    return json({ message: "Invalid credentials" }, { status: 401 });
  }
}
