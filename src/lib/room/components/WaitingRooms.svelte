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

{#if waitingRoomsList.length}
	<div class="rounded bg-purple-100 p-4">
		<h3 class="text-xl font-semibold mb-4">Waiting Rooms</h3>
		<div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4">
			{#each waitingRoomsList as waitingRoom (waitingRoom[0])}
				<RoomItem
					key={waitingRoom[0]}
					title={waitingRoom[1].title}
					on:click={() => forwardClick(waitingRoom[0])}
				/>
			{/each}
		</div>
	</div>
{/if}
