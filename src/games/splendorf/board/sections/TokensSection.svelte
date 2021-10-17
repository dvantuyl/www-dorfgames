<script lang="ts">
	import { colors } from '../../game';
	import Token from '../components/Token.svelte';

	export let game;

	$: tokens = $game.context.tokens;

	$: console.log('game', $game.nextEvents);

	$: disabled = (color): boolean => {
		return !$game.can({ type: 'CAN_SELECT_TOKEN', color });
	};

	function handleClick(color) {
		game.send('SELECT_TOKEN', { color });
	}
</script>

{#each colors as color}
	<button
		class="h-full w-full transform disabled:scale-90 disabled:opacity-80 disabled:cursor-not-allowed"
		value={color}
		on:click={() => handleClick(color)}
		disabled={disabled(color)}
	>
		<Token count={tokens[color]} {color} />
	</button>
{/each}
