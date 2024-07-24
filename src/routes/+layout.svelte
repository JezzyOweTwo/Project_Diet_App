<!-- src/routes/+layout.svelte -->
<script>
  import Header from "../components/header/header.svelte";
  import { goto } from "$app/navigation";

  function handleFetchAllRecipes() {
    document.dispatchEvent(new CustomEvent('fetchAllRecipes'));
  }
</script>

<svelte:head>
  <title>Recipe Manager</title>
</svelte:head>

<Header on:fetchAllRecipes={handleFetchAllRecipes} />

<div class="container">
  <slot />
</div>

<footer>
  &copy; {new Date().getFullYear()} Recipe Manager. All rights reserved.
</footer>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  .container {
    margin: 0;
    padding: 0;
  }

  footer {
    background-color: #f8f8f8;
    text-align: center;
    padding: 1rem;
    border-top: 1px solid #ddd;
    width: 100%;
  }
</style>
