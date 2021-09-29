<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.postcss';
</script>

<div class="w-full min-h-screen flex flex-col">
	<header class="h-16 px-5 w-full flex-none">
		<Header />
	</header>

	<main class="px-5 w-full flex-grow">
		<slot />
	</main>
</div>
