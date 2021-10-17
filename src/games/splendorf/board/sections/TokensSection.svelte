<script lang="ts">
	import { colors } from '../../game';
	import Token from '../components/Token.svelte';

	export let game;

	$: tokens = $game.context.tokens;

	$: disabled = (color): boolean => {
		return !$game.can({ type: 'SELECT_TOKEN', color });
	};

	// function handleClick(color) {
	// 	game.send('SELECT_TOKEN', { color });
	// }
</script>

{#each ['wh', 're', 'bl', 'gr', 'go', 'bk'] as color}
	<button
		class="h-full w-full transform disabled:scale-90 disabled:opacity-80 disabled:cursor-not-allowed"
		value={color}
		on:click={() => game.send('SELECT_TOKEN', { color })}
		disabled={disabled(color)}
	>
		<Token count={tokens[color]} {color} />
	</button>
{/each}
