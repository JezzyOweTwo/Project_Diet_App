<script>
  let navItems = [{name:`Recipes`,href:`recipes`},{name:`Meal Plan`, href: `meal-plans`}, {name: `Profile`, href: `profile`}];
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

    a { text-decoration: none; color: inherit; }
a:visited { text-decoration: none; color: inherit;}
a:hover { text-decoration: none; color: inherit; }
a:focus { text-decoration: none; color: inherit; }
a:hover, a:active { text-decoration: none; color: inherit;}
</style>

<header>
  <div class="logo"><a href="/home"> Recipe Manager</a></div>
  <nav>
    <ul class="nav-links">
      {#each navItems as item}
        <li><a href={`/${item.href}`}>{item.name}</a></li>
      {/each}
    </ul>
  </nav>
</header>
