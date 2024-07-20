<!-- MealPlanCreator.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Recipe, MealPlan, DailyMeal } from '../../types/types';
    import RecipeCard from '../recipe-card/recipe-card.svelte';
  
    export let recipes: Recipe[];

  const dispatch = createEventDispatcher();

  let mealPlanName = '';
  let selectedDay: keyof MealPlan['days'] = 'sunday';
  let selectedMeal: keyof DailyMeal = 'breakfast';

  let mealPlan: MealPlan = {
    id: '',
    name: '',
    days: {
      sunday: {},
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
    },
  };

  function addRecipeToMealPlan(recipe: Recipe) {
    mealPlan.days[selectedDay][selectedMeal] = recipe;
    mealPlan = { ...mealPlan };
  }

  function saveMealPlan() {
    if (!mealPlanName) {
      alert('Please enter a name for your meal plan');
      return;
    }

    mealPlan.id = Date.now().toString();
    mealPlan.name = mealPlanName;
    dispatch('save', mealPlan);

    // Reset the form
    mealPlan = {
      id: '',
      name: '',
      days: {
        sunday: {},
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
      },
    };
    mealPlanName = '';
  }
</script>

<div class="meal-plan-creator">
  <!-- ... (rest of the HTML remains the same) ... -->

  <div class="meal-plan-preview">
    <h3>Meal Plan Preview</h3>
    {#each Object.entries(mealPlan.days) as [day, meals]}
      <div class="day">
        <h4>{day}</h4>
        <p>Breakfast: {meals.breakfast ? meals.breakfast.name : 'Not selected'}</p>
        <p>Lunch: {meals.lunch ? meals.lunch.name : 'Not selected'}</p>
        <p>Dinner: {meals.dinner ? meals.dinner.name : 'Not selected'}</p>
      </div>
    {/each}
  </div>
  
    <button on:click={saveMealPlan}>Save Meal Plan</button>
  </div>
  
  <style>
    .meal-plan-creator {
      max-width: 800px;
      margin: 0 auto;
    }
  
    .selector {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  
    .recipe-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
  
    .recipe-item {
      cursor: pointer;
    }
  
    .meal-plan-preview {
      margin-top: 30px;
    }
  
    .day {
      margin-bottom: 20px;
    }
  </style>