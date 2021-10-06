<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { rooms } from '$lib/room/stores';
	import RoomItem from '$lib/room/components/RoomItem.svelte';

	export let game;
	export let player;
	const dispatch = createEventDispatcher();
	let joinedRooms = [];

	onDestroy(() => ref.off());

	function forwardClick(room) {
		dispatch('click', { room });
	}

	const ref = rooms.joined(player, game, (updatedRooms) => {
		joinedRooms = Object.entries(updatedRooms);
	});
</script>

{#if joinedRooms.length}
	<div class="rounded bg-purple-100 p-4">
		<h3 class="text-xl font-semibold mb-4">Joined Rooms</h3>
		<div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4">
			{#each joinedRooms as joinedRoom (joinedRoom[0])}
				<RoomItem
					key={joinedRoom[0]}
					title={joinedRoom[1].title}
					on:click={() => forwardClick(joinedRoom[0])}
				/>
			{/each}
		</div>
	</div>
{/if}
