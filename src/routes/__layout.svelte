<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Login from '$lib/session/SessionWrapper.svelte';
	import { username } from '$lib/session/user';
	import '../app.postcss';
</script>

<Header />

<main>
	<slot />
</main>
