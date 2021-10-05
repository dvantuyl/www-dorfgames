<script>
	import { createEventDispatcher } from 'svelte';
	import { derived } from 'svelte/store';
	import _object from 'lodash/object.js';
	import { rooms } from '$lib/room/stores';
	import RoomPlayers from '$lib/room/components/RoomPlayers.svelte';

	export let game;
	const dispatch = createEventDispatcher();

	function forwardClick(room) {
		dispatch('click', { room });
	}

	const waitingRooms = derived(rooms, ($rooms) => {
		return _object.pickBy($rooms, (room) => room.stateIndex === 0 && room.game === game);
	});

	$: console.log('waitingRooms', $waitingRooms);
</script>

<div class="grid grid-cols-1 gap-4 rounded bg-purple-100 p-4">
	<h3 class="text-2xl">WaitingRoom</h3>
	<!-- {#each $rooms as room}
		<div
			class="rounded bg-purple-400 p-2 flex flex-col cursor-pointer mb-4 last:mb-0"
			on:click={() => forwardClick(room)}
		>
			<RoomPlayers {game} {room} innerClass="block text-lg mb-2 last:mb-0" />
		</div>
	{/each} -->
</div>
