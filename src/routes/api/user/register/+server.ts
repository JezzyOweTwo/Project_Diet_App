import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import User from "../../../../schemas/user";
import jwt from "jsonwebtoken";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { name, password, email } = await request.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return json({ message: "User email already taken" }, { status: 409 });
    }

    const user = await User.create({ name, password, email });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "30d" }
    );

    return json(
      {
        message: "User registered successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
};
