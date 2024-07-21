<script lang="ts">
  import { onMount } from "svelte";
  import RecipeCard from "../../../components/recipe-card/recipe-card.svelte";
  import type { Recipe } from "../../../types/types";

  let recipes: Recipe[] = [];

  onMount(async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/recipe`);
    const data = await response.json();
    recipes = data.recipes;
  });
</script>

<main>
  <h1>Recipes</h1>
  {#each recipes as recipe}
    <RecipeCard {recipe} />
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
</style>
