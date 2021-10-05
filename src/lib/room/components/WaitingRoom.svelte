<script>
	import { user } from '$lib/session/user';
	import { createEventDispatcher } from 'svelte';
	export let players = [];

	const dispatch = createEventDispatcher();
</script>

<div class="px-5">
	<button on:click={() => dispatch('startGame')}>Start Game</button>
	<div class="flex flex-col bg-red-300 p-4">
		{#each players as player}
			<span class="block text-lg mb-2 last:mb-0">{player.alias}</span>
		{/each}
	</div>
</div>
