<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../../../app.postcss';
</script>

<div class="w-screen h-screen overflow-hidden flex flex-col">
	<header class="h-16 px-5 flex-none">
		<Header />
	</header>
	<main class="flex-grow">
		<slot />
	</main>
</div>
