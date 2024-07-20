<!-- AllMealPlans.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import type { MealPlan, Recipe } from '../../../types/types';
    import MealPlanCreator from '../../../components/meal-plan/meal-plan-creator.svelte';
    import MealPlanCard from '../../../components/meal-plan/meal-plan-card.svelte';
  
    let mealPlans: MealPlan[] = [];
    let recipes: Recipe[] = [];
  
    onMount(async () => {
      const response = await fetch('https://dummyjson.com/recipes');
      const data = await response.json();
      recipes = data.recipes;
  
      // Load meal plans from local storage
      const storedMealPlans = localStorage.getItem('mealPlans');
      if (storedMealPlans) {
        mealPlans = JSON.parse(storedMealPlans);
      }
    });
  
    function handleSaveMealPlan(event: CustomEvent<MealPlan>) {
      const newMealPlan = event.detail;
      mealPlans = [...mealPlans, newMealPlan];
      
      // Save to local storage
      localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
    }
  </script>
  
  <main>
    <h1>Meal Plans</h1>
  
    <MealPlanCreator {recipes} on:save={handleSaveMealPlan} />
  
    <h2>Your Meal Plans</h2>
    <div class="meal-plans-list">
      {#each mealPlans as mealPlan (mealPlan.id)}
        <MealPlanCard {mealPlan} />
      {/each}
    </div>
  </main>
  
  <style>
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  
    .meal-plans-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
  </style>