<!-- src/routes/+layout.svelte -->
<script>
    import Header from '../components/header/header.svelte';
  </script>
  
  <style>
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
  
    footer {
      background-color: #f8f8f8;
      text-align: center;
      padding: 1rem;
      margin-top: 2rem;
      border-top: 1px solid #ddd;
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
  