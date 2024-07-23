<script lang="ts">
  import { onMount } from "svelte";
  import RecipeCard from "../../../components/recipe-card/recipe-card.svelte";
  import type { Recipe } from "../../../types/types";

  let recipes: Recipe[] = [];
  let errorMessage: string = "";
  let boxes: HTMLDivElement[] = [];

  async function fetchRecipes() {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/recipe`);
      const data = await response.json();
      recipes = data.recipes;
      checkBoxes();
    } catch (error) {
      errorMessage = "An error occurred while fetching recipes from the server";
    }
  }

  function checkBoxes() {
    const boxes = document.querySelectorAll(".box");

    const triggerBottom = (window.innerHeight / 5) * 4;
    console.log(triggerBottom, "trigger bottom");

    boxes.forEach((box, index) => {
      const boxTop = box.getBoundingClientRect().top;
      //console.log(boxTop, "box top ", index);

      if (boxTop < triggerBottom) {
        box.classList.add("show");
        console.log(box.classList, "box class");
      } else {
        box.classList.remove("show");
      }
    });
  }

  onMount(() => {
    fetchRecipes();

    window.addEventListener("scroll", checkBoxes);

    return () => {
      window.removeEventListener("scroll", checkBoxes);
    };
  });
</script>

<main>
  <h1>Recipes</h1>
  {#each recipes as recipe}
    <div class="box show">
      <RecipeCard {recipe} />
    </div>
  {/each}
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
