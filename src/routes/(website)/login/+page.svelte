<script lang="ts">
    import { onMount } from 'svelte';
  
    let isLogin: boolean = true;
    let email: string = '';
    let password: string = '';
    let confirmPassword: string = '';
    let name: string = '';
    let rememberMe: boolean = false;
    let errorMessage: string = '';
  
    let passwordStrength: number = 0;
  
    function toggleForm(): void {
      isLogin = !isLogin;
      resetForm();
    }
  
    function resetForm(): void {
      email = '';
      password = '';
      confirmPassword = '';
      name = '';
      rememberMe = false;
      errorMessage = '';
    }
  
    function validateEmail(email: string): boolean {
      const re: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    function checkPasswordStrength(password: string): void {
      passwordStrength = password.length > 8 ? 
        (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/) ? 3 : 2) 
        : (password.length > 5 ? 1 : 0);
    }
  
    function handleSubmit(): void {
      if (!validateEmail(email)) {
        errorMessage = 'Please enter a valid email address.';
        return;
      }
  
      if (password.length < 8) {
        errorMessage = 'Password must be at least 8 characters long.';
        return;
      }
  
      if (!isLogin && password !== confirmPassword) {
        errorMessage = 'Passwords do not match.';
        return;
      }
  
      console.log(isLogin ? 'Logging in...' : 'Signing up...', { email, password, name, rememberMe });
      
      resetForm();
    }
  
    function handleForgotPassword(): void {
      console.log('Forgot password for:', email);
    }
  
    function handleSocialLogin(provider: string): void {
      console.log('Social login with:', provider);
    }
  
    onMount(() => {
      // Any initialization code can go here
    });
  </script>
  <body>
    <main>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      
        <form on:submit|preventDefault={handleSubmit}>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} required>
          </div>
      
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} on:input={() => checkPasswordStrength(password)} required>
            {#if !isLogin}
              <div class="password-strength">
                Password strength: 
                <span class="strength-{passwordStrength}">
                  {passwordStrength === 0 ? 'Weak' : passwordStrength === 1 ? 'Medium' : passwordStrength === 2 ? 'Strong' : 'Very Strong'}
                </span>
              </div>
            {/if}
          </div>
      
          {#if !isLogin}
            <div>
              <label for="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" bind:value={confirmPassword} required>
            </div>
      
            <div>
              <label for="name">Name (optional):</label>
              <input type="text" id="name" bind:value={name}>
            </div>
          {/if}
      
          {#if isLogin}
            <div>
              <input type="checkbox" id="rememberMe" bind:checked={rememberMe}>
              <label for="rememberMe">Remember me</label>
            </div>
          {/if}
      
          {#if errorMessage}
            <div class="error">{errorMessage}</div>
          {/if}
      
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
      
        <div>
          <button on:click={toggleForm}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      
        {#if isLogin}
          <div>
            <button on:click={handleForgotPassword}>Forgot Password?</button>
          </div>
        {/if}
      
        <div class="social-login">
          <button on:click={() => handleSocialLogin('google')}>Login with Google</button>
          <button on:click={() => handleSocialLogin('facebook')}>Login with Facebook</button>
        </div>
      </main>
  </body>

  
  <style>
    body {
        background-color: rgb(230, 163, 146);
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center
    }

    main {
      background-color: rgba(255, 255, 255, 0.356);
      width: 50%;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }
  
    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 50%;
    }
  
    .error {
      color: red;
    }
  
    .password-strength {
      font-size: 0.8em;
    }
  
    .strength-0 { color: red; }
    .strength-1 { color: orange; }
    .strength-2 { color: yellow; }
    .strength-3 { color: green; }
  
    .social-login {
      width: 50%;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }

    button {
      padding: 10px;
      border-radius: 5px;
      background-color: rgb(221, 79, 44);
      color: white;
      border: none;
    }

    button:hover {
      cursor: pointer;
      background-color: rgb(231, 98, 70);
    }
  </style>