import { json, type RequestEvent } from "@sveltejs/kit";
import Recipe from "../../../schemas/recipe";

export async function GET({ request }: RequestEvent) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword")
    ? {
        $or: [
          { name: { $regex: url.searchParams.get("keyword"), $options: "i" } },
          {
            ingredients: {
              $regex: url.searchParams.get("keyword"),
              $options: "i",
            },
          },
        ],
      }
    : {};

  try {
    const recipes = await Recipe.find({ ...keyword });
    return json({ recipes }, { status: 200 });
  } catch (error) {
    return json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
