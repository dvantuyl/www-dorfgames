<script>
	import { rooms } from '$lib/room/stores';
	import { onDestroy } from 'svelte';
	export let key;
	export let title;

	let players = [];

	onDestroy(() => ref.off());

	const ref = rooms.get(key).players((roomPlayers) => {
		players = Object.values(roomPlayers);
	});
</script>

{#if players.length}
	<div
		class="rounded bg-purple-400 p-2 flex flex-col cursor-pointer mb-4 last:mb-0 h-full"
		on:click
	>
		<h4 class="text-lg font-bold text-center capitalize mb-2 text-purple-900">
			{title ? title : key}
		</h4>
		<div class="bg-purple-200 rounded p-2 h-full">
			{#each players as player}
				<span class="text-lg block text-purple-900 font-medium">{player.alias}</span>
			{/each}
		</div>
	</div>
{/if}
