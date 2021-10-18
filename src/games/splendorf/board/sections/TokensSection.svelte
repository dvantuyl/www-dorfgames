<script lang="ts">
	import type { GameEvt } from '../../game';
	import { colors, canSelectToken } from '../../game';
	import Token from '../components/Token.svelte';

	export let game;

	$: tokens = $game.context.tokens;

	$: disabled = (color): boolean => {
		const evt: GameEvt = { type: 'SELECT_TOKEN', color };
		return !($game.nextEvents.includes('SELECT_TOKEN') && canSelectToken($game.context, evt));
	};

	function handleClick(color) {
		game.send('SELECT_TOKEN', { color });
	}
</script>

{#each colors as color}
	<button
		class="h-full w-full transform
					{tokens[color] === 0 ? 'disabled:opacity-0' : 'disabled:opacity-80'}
					disabled:scale-90 disabled:cursor-not-allowed"
		class:opacity-0={tokens[color] === 0}
		value={color}
		on:click={() => handleClick(color)}
		disabled={disabled(color)}
	>
		<Token count={tokens[color]} {color} />
	</button>
{/each}
