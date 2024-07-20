<script lang="ts">
    import { onMount } from 'svelte';
  
    let recipes: string | any[] = [];
    let error = '';
  
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json();
        recipes = data.recipes; // Adjust based on the actual structure of the returned data
      } catch (err) {
        error = 'Failed to fetch recipes';
      }
    };
  
    onMount(() => {
      fetchRecipes();
    });
  </script>
  
  <style>
    /* Add some basic styling */
    .recipe {
      border: 1px solid #ccc;
      padding: 1em;
      margin: 1em 0;
    }
  </style>
  
  <main>
    <h1>Recipes</h1>
    {#if error}
      <p>{error}</p>
    {:else if recipes.length === 0}
      <p>Loading...</p>
    {:else}
      {#each recipes as recipe}
        <div class="recipe">
          <h2>{recipe.name}</h2>
          <p><strong>Ingredients:</strong></p>
          <ul>
            {#each recipe.ingredients as ingredient}
              <li>{ingredient}</li>
            {/each}
          </ul>
        <img src={recipe.image} alt="">
          <p><strong>Instructions:</strong></p>
          <ol>
            {#each recipe.instructions as instruction}
              <li>{instruction}</li>
            {/each}
          </ol>
        </div>
      {/each}
    {/if}
  </main>