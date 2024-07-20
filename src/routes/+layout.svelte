<!-- src/routes/+layout.svelte -->
<script>
    import Header from '../components/header/header.svelte';
  </script>
  
  <style>
    :global(body) {
      margin: 0;
      padding: 0;
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
  
  <svelte:head>
    <title>Recipe Manager</title>
  </svelte:head>
  
  <Header />
  
  <div class="container">
    <slot />
  </div>
  
  <footer>
    &copy; {new Date().getFullYear()} Recipe Manager. All rights reserved.
  </footer>
  