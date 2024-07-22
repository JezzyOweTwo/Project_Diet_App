import { json } from "@sveltejs/kit";
import User from "../../../../schemas/user";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const user = await User.findById(params.id);

    if (!user) {
      return json({ message: "User not found" }, { status: 404 });
    }

    return json(user, { status: 200 });
  } catch (error) {
    return json({ message: "Server error" }, { status: 500 });
  }
}
