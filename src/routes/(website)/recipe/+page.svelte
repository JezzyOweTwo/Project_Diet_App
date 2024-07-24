<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import RecipeCard from "../../../components/recipe-card/recipe-card.svelte";
  import type { Recipe } from "../../../types/types";

  let recipes: Recipe[] = [];
  let errorMessage: string = "";
  let check: boolean = false;

  export let keyword: string = "";

  async function fetchRecipes(key: string = "") {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/recipe?keyword=${key}`
      );
      const data = await response.json();
      recipes = data.recipes;
      if (recipes.length) {
        check = true;
      }
      checkBoxes();
    } catch (error) {
      errorMessage = "An error occurred while fetching recipes from the server";
    }
  }

  const searchRecipes = async () => {
    goto(`?keyword=${encodeURIComponent(keyword)}`);
    check = false;
    fetchRecipes(keyword);
  };

  function checkBoxes() {
    const boxes = document.querySelectorAll(".box");

    const triggerBottom = (window.innerHeight / 5) * 4;

    boxes.forEach((box, index) => {
      const boxTop = box.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        box.classList.add("show");
      } else {
        box.classList.remove("show");
      }
    });
  }

  onMount(() => {
    document.addEventListener("fetchAllRecipes", () => {
      fetchRecipes("");
    });
    const urlParams = new URLSearchParams(window.location.search);
    keyword = urlParams.get("keyword") || "";
    if (keyword) {
      fetchRecipes(keyword);
    } else fetchRecipes("");
    window.addEventListener("scroll", checkBoxes);

    return () => {
      window.removeEventListener("scroll", checkBoxes);
    };
  });
</script>

<main>
  <input type="text" bind:value={keyword} placeholder="Search recipes..." />
  <button on:click={searchRecipes}>Search</button>
  <h1>Recipes</h1>
  {#if check}
    {#each recipes as recipe}
      <div class="box show">
        <RecipeCard {recipe} />
      </div>
    {/each}
  {:else}
    <h1>No recipes found with {keyword}</h1>
  {/if}
</main>

<style>
  h1 {
    text-align: center;
  }
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 20vh;
    transform: translateX(100%);
    transition: transform 0.8s ease;
  }
  .box:nth-of-type(even) {
    transform: translateX(-100%);
  }
  .box.show {
    transform: translateX(0%);
  }
  main {
    overflow-x: hidden;
  }
</style>
