<script>
	import Player from '../components/Player.svelte';
	export let players;

	const orderedPlayers = Object.values(players).sort((a, b) => a.index - b.index);
	console.log(orderedPlayers);
</script>

<div class="h-full w-full">
	{#each orderedPlayers as player}
		<div class="pb-2 last:pb-0">
			<Player {player} />
		</div>
	{/each}
</div>
