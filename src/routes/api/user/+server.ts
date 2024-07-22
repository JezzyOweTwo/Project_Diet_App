import { json } from "@sveltejs/kit";
import User from "../../../schemas/user.ts";

export async function GET() {
  const users = await User.find();
  return json({ users: users }, { status: 201 });
}
