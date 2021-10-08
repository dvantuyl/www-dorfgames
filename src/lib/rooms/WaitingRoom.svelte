<script>
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/Button.svelte';
	export let users = {};

	const dispatch = createEventDispatcher();
</script>

<div class="px-5">
	<Button innerClass="mb-5" on:click={() => dispatch('startGame')}>Start Game</Button>
	<div class="flex flex-col bg-red-200 p-4 rounded">
		<h3 class="text-xl text-red-900 font-semibold mb-2">Players</h3>
		{#each Object.values(users) as user}
			<span class="block text-lg mb-2 last:mb-0">{user.alias}</span>
		{/each}
	</div>
</div>
