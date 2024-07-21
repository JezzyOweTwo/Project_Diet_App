import { json } from "@sveltejs/kit";
import connectDB from "$lib/db";
import User from "../../../../schemas/user";

connectDB();

export async function POST({ request }: { request: Request }) {
  const { name, password, email } = await request.json();
  console.log(name, password, email);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return json({ message: "User email already taken" }, { status: 409 });
  }

  const user = new User({ name, password, email });
  await user.save();

  return json(
    { message: "User registered successfully", user },
    { status: 201 }
  );
}
