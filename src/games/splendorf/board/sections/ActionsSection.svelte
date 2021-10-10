<script>
	import { createEventDispatcher } from 'svelte';
	export let game;
	export let room;

	function handleAction(event) {
		switch (event.target.value) {
			case 'endTurn':
				game.send('GAME.END_TURN');
				game.send('GAME.PUBLISH', { callback: room.publishState });
				break;
		}
	}
</script>

<div class="h-full w-full flex justify-around items-center">
	<button
		class="bg-gray-400 border-2 border-gray-700 p-2 rounded-lg font-black text-gray-700"
		value="endTurn"
		on:click={handleAction}
	>
		END TURN
	</button>
</div>
