<script lang="ts">
  import { onMount } from "svelte";
  import Spoonacularcard from "../../../components/spoonacular-card/Spoonacularcard.svelte";
  import type { SpoonacularRecipe } from "../../../types/types";

  let recipes: SpoonacularRecipe[] = [];
  let errorMessage: string = "";

  onMount(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/spoonacular`
      );
      if (response.ok) {
        const data = await response.json();
        recipes = data; // Ensure the API response contains an array of recipes
        console.log(data);
      } else {
        errorMessage = "Failed to fetch recipes from the server";
      }
    } catch (error) {
      errorMessage = "An error occurred while fetching recipes from the server";
    }
  });
</script>

<main>
  <h1>Recipes</h1>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
  {#each recipes as recipe}
    <Spoonacularcard {recipe} />
  {/each}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .error {
    color: red;
  }
</style>
