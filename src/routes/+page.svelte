<h1>Welcome to SvelteKit</h1>
<p>Visit 
    <a href="https://kit.svelte.dev">kit.svelte.dev</a> 
    to read the documentation

</p>

<button on:click={run}>Press me bitch ass nigga bruh!</button>

<script>
	async function run() {
		const response = await (await fetch('/api')).json();
        console.log(response);
	}
</script>