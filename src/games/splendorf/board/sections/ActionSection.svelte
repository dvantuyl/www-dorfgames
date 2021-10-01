<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleAction(event) {
		dispatch('action', { value: event.target.value });
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
