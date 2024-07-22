<script lang="ts">
  import { onMount } from 'svelte';
  import type { MealPlan, Recipe, DailyMeal } from '../../../types/types';
  import MealPlanCard from '../../../components/meal-plan/meal-plan-card.svelte';

  let mealPlans: MealPlan[] = [];
  let recipes: Recipe[] = [];
  let daysOfWeek: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  onMount(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/recipe`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      recipes = data.recipes;
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }

    // Load meal plans from local storage
    const storedMealPlans = localStorage.getItem('mealPlans');
    if (storedMealPlans) {
      mealPlans = JSON.parse(storedMealPlans);
    }
  });

  function handleSaveMealPlan(day: string, type: keyof DailyMeal, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedRecipeIndex = selectElement.selectedIndex - 1;
    const recipe = recipes[selectedRecipeIndex] || null;

    // Load meal plans from local storage to ensure up-to-date state
    const storedMealPlans = localStorage.getItem('mealPlans');
    if (storedMealPlans) {
      mealPlans = JSON.parse(storedMealPlans);
    }

    // Update the meal plan
    let mealPlan = mealPlans.find(mp => mp.id === 'default');
    if (!mealPlan) {
      mealPlan = {
        id: 'default',
        name: 'Weekly Plan',
        days: {
          sunday: { breakfast: null, lunch: null, dinner: null },
          monday: { breakfast: null, lunch: null, dinner: null },
          tuesday: { breakfast: null, lunch: null, dinner: null },
          wednesday: { breakfast: null, lunch: null, dinner: null },
          thursday: { breakfast: null, lunch: null, dinner: null },
          friday: { breakfast: null, lunch: null, dinner: null },
          saturday: { breakfast: null, lunch: null, dinner: null },
        },
      };
      mealPlans = [...mealPlans, mealPlan];
    }

    mealPlan.days[day as keyof typeof mealPlan.days][type] = recipe;


    // Update local storage
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans));

    // Reflect changes in the UI immediately
    mealPlans = [...mealPlans];
  }

  function clearMealPlans() {
    mealPlans = mealPlans.map(plan => {
      Object.keys(plan.days).forEach(day => {
        plan.days[day as keyof MealPlan['days']] = { breakfast: null, lunch: null, dinner: null };
      });
      return plan;
    });

    // Update local storage
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
  }

  function resetDropdowns(day: string) {
    const dropdowns = document.querySelectorAll(`select[data-day="${day}"]`);
    dropdowns.forEach(dropdown => {
      (dropdown as HTMLSelectElement).selectedIndex = 0;
    });
  }
</script>

<main>
  <div class="container">
    <div class="dropdowns">
      <h1>Meal Plans</h1>
  
      {#each daysOfWeek as day}
        <div class="day-section">
          <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
          <div class="meal-type">
            <label for={`breakfast-${day}`}>Breakfast:</label>
            <select id={`breakfast-${day}`} data-day={day} on:change={(e) => handleSaveMealPlan(day, 'breakfast', e)}>
              <option value="" disabled selected>Select a recipe</option>
              {#each recipes as recipe}
                <option value={recipe.name}>{recipe.name}</option>
              {/each}
            </select>
          </div>
  
          <div class="meal-type">
            <label for={`lunch-${day}`}>Lunch:</label>
            <select id={`lunch-${day}`} data-day={day} on:change={(e) => handleSaveMealPlan(day, 'lunch', e)}>
              <option value="" disabled selected>Select a recipe</option>
              {#each recipes as recipe}
                <option value={recipe.name}>{recipe.name}</option>
              {/each}
            </select>
          </div>
  
          <div class="meal-type">
            <label for={`dinner-${day}`}>Dinner:</label>
            <select id={`dinner-${day}`} data-day={day} on:change={(e) => handleSaveMealPlan(day, 'dinner', e)}>
              <option value="" disabled selected>Select a recipe</option>
              {#each recipes as recipe}
                <option value={recipe.name}>{recipe.name}</option>
              {/each}
            </select>
          </div>
  
          <button on:click={() => resetDropdowns(day)}>Reset</button>
        </div>
      {/each}
  
    </div>
    <div class="plan">
      <h2>Your Meal Plans</h2>
      <div class="meal-plans-list">
        {#each mealPlans as mealPlan}
          <MealPlanCard {mealPlan} />
        {/each}
      </div>
      <button on:click={clearMealPlans}>Clear Meal Plan</button>
    </div>
  </div>
  
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .meal-type {
    margin-bottom: 15px;
  }

  .meal-plans-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #d32f2f;
  }

  .container {
    display: grid;
    grid-template-columns: auto auto;
  }

  .day-section {
    margin-bottom: 30px;
  }

  .day-section button {
    margin-top: 10px;
  }
</style>
