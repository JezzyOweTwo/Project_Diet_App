import { json } from '@sveltejs/kit';
import 'dotenv/config';

export async function GET() {
  const apiKey = process.env.VITE_SPOONACULAR_API_KEY;
  const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=30`;

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return json(data.recipes, { status: 200 });
    } else {
      return json({ message: 'Failed to fetch recipes from Spoonacular API' }, { status: 500 });
    }
  } catch (error) {
    return json({ message: 'An error occurred while fetching recipes from Spoonacular API' }, { status: 500 });
  }
}
