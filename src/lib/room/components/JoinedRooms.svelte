<script>
	import { createEventDispatcher } from 'svelte';
	import { derived } from 'svelte/store';
	import _object from 'lodash/object.js';
	import { rooms } from '$lib/room/stores';
	import RoomItem from '$lib/room/components/RoomItem.svelte';

	export let game;
	export let player;
	const dispatch = createEventDispatcher();
	let joinedRooms = [];

	function forwardClick(room) {
		dispatch('click', { room });
	}

	$: if (player) {
		rooms.withPlayer(player, game, (playerRooms) => {
			joinedRooms = Object.entries(playerRooms);
		});
	}
</script>

{#if joinedRooms.length}
	<div class="rounded bg-purple-100 p-4">
		<h3 class="text-2xl font-bold mb-2">Joined Rooms</h3>
		<div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4">
			{#each joinedRooms as joinedRoom (joinedRoom[0])}
				<RoomItem
					key={joinedRoom[0]}
					on:click={() => forwardClick(joinedRoom[0])}
					innerClass="block text-lg mb-2 last:mb-0"
				/>
			{/each}
		</div>
	</div>
{/if}
