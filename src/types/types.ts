// types.ts
export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}


export interface DailyMeal {
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
}

export interface MealPlan {
  id: string;
  name: string;
  days: {
    sunday: DailyMeal;
    monday: DailyMeal;
    tuesday: DailyMeal;
    wednesday: DailyMeal;
    thursday: DailyMeal;
    friday: DailyMeal;
    saturday: DailyMeal;
  };
}