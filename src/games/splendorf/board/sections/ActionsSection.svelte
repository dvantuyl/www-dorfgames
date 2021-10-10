<script lang="ts">
	export let game;
	export let room;

	function handleAction(event) {
		switch (event.target.value) {
			case 'GAME.RESET_TURN':
				game.send('GAME.RESET_TURN');
				break;
			case 'GAME.END_TURN':
				game.send('GAME.END_TURN');
				game.send('GAME.PUBLISH', {
					callback: room.publishState
				});
				break;
		}
	}

	$: disabled = (action): boolean => {
		return !$game.can({ type: action });
	};
</script>

<div class="h-full w-full flex justify-around items-center">
	<button
		class="bg-gray-400 border-2 border-gray-700 p-2 rounded-lg font-black text-gray-700 disabled:hidden"
		value="GAME.RESET_TURN"
		on:click={handleAction}
		disabled={disabled('GAME.RESET_TURN')}
	>
		RESET TURN
	</button>
	<button
		class="bg-gray-400 border-2 border-gray-700 p-2 rounded-lg font-black text-gray-700 disabled:hidden"
		value="GAME.END_TURN"
		on:click={handleAction}
		disabled={disabled('GAME.END_TURN')}
	>
		END TURN
	</button>
</div>
