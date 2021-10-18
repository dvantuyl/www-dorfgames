<script lang="ts">
	export let game;
	export let room;

	function handleAction(event) {
		switch (event.target.value) {
			case 'RESET_TURN':
				game.send('RESET_TURN');
				break;
			case 'END_TURN':
				game.send('END_TURN');
				game.send('PUBLISH', {
					callback: room.publishState
				});
				break;
		}
	}

	$: disabled = (action): boolean => {
		return !$game.nextEvents.includes(action);
	};
</script>

<div class="h-full w-full flex justify-around items-center">
	<button
		class="bg-gray-400 border-2 border-gray-700 p-2 rounded-lg font-black text-gray-700 disabled:opacity-0"
		value="RESET_TURN"
		on:click={handleAction}
		disabled={disabled('RESET_TURN')}
	>
		RESET TURN
	</button>
	<button
		class="bg-gray-400 border-2 border-gray-700 p-2 rounded-lg font-black text-gray-700 disabled:opacity-0"
		value="END_TURN"
		on:click={handleAction}
		disabled={disabled('END_TURN')}
	>
		END TURN
	</button>
</div>
