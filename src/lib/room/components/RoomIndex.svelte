<script>
	import { createEventDispatcher } from 'svelte';
	import RoomPlayers from '$lib/room/components/RoomPlayers.svelte';
	export let game;
	export let rooms = [];
	export let title = '';

	const dispatch = createEventDispatcher();

	function forwardClick(room) {
		dispatch('click', { room });
	}
</script>

<div class="grid grid-cols-1 gap-4 rounded bg-purple-100 p-4">
	<h3 class="text-2xl">{title}</h3>
	{#each rooms as room}
		<div
			class="rounded bg-purple-400 p-2 flex flex-col cursor-pointer mb-4 last:mb-0"
			on:click={() => forwardClick(room)}
		>
			<RoomPlayers {game} {room} innerClass="block text-lg mb-2 last:mb-0" />
		</div>
	{/each}
</div>
