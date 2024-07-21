import { json } from "@sveltejs/kit";
import connectDB from "$lib/db";
import Recipe from "../../../../schemas/recipe";

connectDB();
export async function GET({ params }: { params: { id: string } }) {
  try {
    const recipe = await Recipe.findById(params.id);

    if (!recipe) {
      return json({ message: "recipe not found" }, { status: 404 });
    }

    return json(recipe, { status: 200 });
  } catch (error) {
    return json({ message: "Server error" }, { status: 500 });
  }
}
