<script>
	import Player from '../components/Player.svelte';
	export let players;
</script>

<div class="h-full w-full">
	{#each players as player}
		<div class="pb-2 last:pb-0">
			<Player {player} />
		</div>
	{/each}
</div>
