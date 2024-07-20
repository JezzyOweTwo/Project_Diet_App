<script lang="ts">
  import type { Recipe } from '../../types/types';

  export let recipe: Recipe;
</script>

<div class="recipe">
  <img src={recipe.image} alt={recipe.name} class="recipe-image" />
  <h2>{recipe.name}</h2>
  <p class="calories">Calories per Serving: {recipe.caloriesPerServing}</p>
  <div class="recipe-meta">
    <p>Prep Time: {recipe.prepTimeMinutes} minutes</p>
    <p>Cook Time: {recipe.cookTimeMinutes} minutes</p>
    <p>Servings: {recipe.servings}</p>
    <p>Difficulty: {recipe.difficulty}</p>
    <p>Cuisine: {recipe.cuisine}</p>
    <p>Rating: {recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)</p>
  </div>
  <div class="tags">
    {#each recipe.tags as tag}
      <span class="tag">{tag}</span>
    {/each}
  </div>
  <h3>Ingredients:</h3>
  <ul>
    {#each recipe.ingredients as ingredient}
      <li>{ingredient}</li>
    {/each}
  </ul>
  <h3>Instructions:</h3>
  <ol>
    {#each recipe.instructions as instruction}
      <li>{instruction}</li>
    {/each}
  </ol>
  <p>Meal Type: {recipe.mealType.join(', ')}</p>
</div>

<style>
  .recipe {
    max-width: 600px;
    background-color: antiquewhite;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 2rem;
  }
  .recipe-image {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 15px;
  }
  .calories {
    font-weight: bold;
    margin-bottom: 10px;
  }
  .recipe-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    margin-bottom: 15px;
  }
  .tags {
    margin-bottom: 15px;
  }
  .tag {
    background-color: #f0f0f0;
    padding: 5px 10px;
    border-radius: 20px;
    margin-right: 5px;
    font-size: 0.9em;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 5px;
  }
  ul, ol {
    padding-left: 20px;
  }
</style>

<!-- <style>
  .recipe {
    max-width: 600px;
    background-color: antiquewhite;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: 2rem;;
  }

  .recipe-image {
    width: 100%;
    height: auto;
  }
</style> -->