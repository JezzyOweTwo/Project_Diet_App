import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

import User from "../../../../schemas/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST: RequestHandler = async ({ request }) => {
  try {
    

    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    return json({ 
      message: "Login successful", 
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      } 
    }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return json({ message: "An error occurred during login" }, { status: 500 });
  }
};