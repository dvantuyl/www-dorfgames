<script>
	import { createEventDispatcher } from 'svelte';
	import { derived } from 'svelte/store';
	import _object from 'lodash/object.js';
	import { rooms } from '$lib/room/stores';
	import RoomItem from '$lib/room/components/RoomItem.svelte';

	export let game;
	const dispatch = createEventDispatcher();

	function forwardClick(room) {
		dispatch('click', { room });
	}

	const waitingRooms = derived(rooms, ($rooms) =>
		_object.pickBy($rooms, (room) => room.stateIndex === 0 && room.game === game)
	);

	$: waitingRoomsList = Object.entries($waitingRooms);
</script>

<div class="grid grid-cols-1 gap-4 rounded bg-purple-100 p-4">
	<h3 class="text-2xl">Waiting Rooms</h3>
	{#each waitingRoomsList as waitingRoom (waitingRoom[0])}
		<RoomItem
			key={waitingRoom[0]}
			on:click={() => forwardClick(waitingRoom[0])}
			innerClass="block text-lg mb-2 last:mb-0"
		/>
	{/each}
</div>
