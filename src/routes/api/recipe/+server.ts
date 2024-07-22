import { json } from "@sveltejs/kit";
import Recipe from "../../../schemas/recipe";


export async function GET() {
  const recipes = await Recipe.find();
  return json({ recipes: recipes }, { status: 201 });
}
