<script>
	import { rooms } from '$lib/room/stores';
	export let key;
	export let innerClass = '';

	let players = [];

	$: room = rooms.get(key);

	$: if (room) {
		room.players((roomPlayers) => {
			players = Object.values(roomPlayers);
		});
	}
</script>

{#if players.length}
	<div class="rounded bg-purple-400 p-2 flex flex-col cursor-pointer mb-4 last:mb-0" on:click>
		{#each players as player}
			<span class={innerClass}>{player.alias}</span>
		{/each}
	</div>
{/if}
