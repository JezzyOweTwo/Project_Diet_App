<h1>Welcome to SvelteKit</h1>
<p>Visit 
    <a href="https://kit.svelte.dev">kit.svelte.dev</a> 
    to read the documentation

</p>

<button on:click={run}>Press me</button>

<script>
	async function run() {
		const response = await (await fetch('/api/user')).json();
        console.log(response);
	}
</script>