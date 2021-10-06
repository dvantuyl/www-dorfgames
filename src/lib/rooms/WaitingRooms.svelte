<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { rooms } from '$lib/stores';
	import RoomItem from '$lib/rooms/RoomItem.svelte';

	export let game;
	const dispatch = createEventDispatcher();
	let waitingRooms = [];

	onDestroy(() => ref.off());

	function forwardClick(room) {
		dispatch('click', { room });
	}

	const ref = rooms.waiting(game, (updatedRooms) => {
		waitingRooms = Object.entries(updatedRooms);
	});
</script>

{#if waitingRooms.length}
	<div class="rounded bg-purple-100 p-4">
		<h3 class="text-xl font-semibold mb-4">Waiting Rooms</h3>
		<div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4">
			{#each waitingRooms as waitingRoom (waitingRoom[0])}
				<RoomItem
					key={waitingRoom[0]}
					title={waitingRoom[1].title}
					on:click={() => forwardClick(waitingRoom[0])}
				/>
			{/each}
		</div>
	</div>
{/if}
