<script lang="ts">
  import type { SpoonacularRecipe } from "../../types/types.ts";

  export let recipe: SpoonacularRecipe;
</script>

<div class="recipe">
  <img src={recipe.image} alt={recipe.title} class="recipe-image" />
  <h2>{recipe.title}</h2>
  <div class="recipe-meta">
    <p>Ready in: {recipe.readyInMinutes} minutes</p>
    <p>Servings: {recipe.servings}</p>
    {#if recipe.cuisines && recipe.cuisines.length > 0}
      <p>Cuisine: {recipe.cuisines.join(", ")}</p>
    {/if}
    {#if recipe.diets && recipe.diets.length > 0}
      <p>Diet: {recipe.diets.join(", ")}</p>
    {/if}
    {#if recipe.dishTypes && recipe.dishTypes.length > 0}
      <p>Dish Types: {recipe.dishTypes.join(", ")}</p>
    {/if}
  </div>
  <div class="tags">
    {#each recipe.cuisines as cuisine}
      <span class="tag">{cuisine}</span>
    {/each}
    {#each recipe.diets as diet}
      <span class="tag">{diet}</span>
    {/each}
    {#each recipe.dishTypes as dishType}
      <span class="tag">{dishType}</span>
    {/each}
  </div>
  <h3>Ingredients:</h3>
  <ul>
    {#each recipe.extendedIngredients as ingredient}
      <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
    {/each}
  </ul>
  <h3>Instructions:</h3>
  <ol>
    {#each recipe.analyzedInstructions[0]?.steps as step}
      <li>{step.step}</li>
    {/each}
  </ol>
  <p>
    Source: <a href={recipe.sourceUrl} target="_blank">{recipe.sourceName}</a>
  </p>
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

  ul,
  ol {
    padding-left: 20px;
  }

  p {
    margin: 0;
  }
</style>
