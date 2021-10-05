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

	rooms.withPlayer(player, game, (playerRooms) => {
		joinedRooms = Object.entries(playerRooms);
		console.log('joinedRooms', playerRooms);
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
