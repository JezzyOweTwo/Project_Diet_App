/** @format */

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

export type DailyMeal = {
  breakfast?: Recipe | null;
  lunch?: Recipe | null;
  dinner?: Recipe | null;
};

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

// src/types/SpoonacularRecipe.ts

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export interface Step {
  number: number;
  step: string;
}

export interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  cuisines: string[];
  diets: string[];
  dishTypes: string[];
  extendedIngredients: Ingredient[];
  analyzedInstructions: AnalyzedInstruction[];
  sourceName: string;
  sourceUrl: string;
}
