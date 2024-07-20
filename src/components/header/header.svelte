<script>
  let navItems = [{name:`Recipes`,href:`recipes`},{name:`Meal Plan`, href: `mealplans`}, {name: `Profile`, href: `profile`}];
</script>

<style>
  header {
    background-color: #4CAF50;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 1.5rem;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }

  .nav-links a:hover {
    text-decoration: underline;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>

<header>
  <div class="logo">Recipe Manager</div>
  <nav>
    <ul class="nav-links">
      {#each navItems as item}
        <li><a href={`/${item.href}`}>{item.name}</a></li>
      {/each}
    </ul>
  </nav>
</header>
