import { json } from "@sveltejs/kit";
import Recipe from "../../../../schemas/recipe";


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
