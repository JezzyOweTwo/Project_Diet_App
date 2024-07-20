<!-- MealPlanCard.svelte -->
<script lang="ts">
    import type { MealPlan } from '../../types/types';
  
    export let mealPlan: MealPlan;
</script>

<div class="meal-plan-card">
  <h2>{mealPlan.name}</h2>
  {#each Object.entries(mealPlan.days) as [day, meals]}
    <div class="day">
      <h3>{day}</h3>
      <p>Breakfast: {meals.breakfast ? meals.breakfast.name : 'Not selected'}</p>
      <p>Lunch: {meals.lunch ? meals.lunch.name : 'Not selected'}</p>
      <p>Dinner: {meals.dinner ? meals.dinner.name : 'Not selected'}</p>
    </div>
  {/each}
</div>
  
  <style>
    .meal-plan-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
  
    .day {
      margin-bottom: 15px;
    }
  
    h3 {
      margin-bottom: 5px;
    }
  
    p {
      margin: 2px 0;
    }
  </style>