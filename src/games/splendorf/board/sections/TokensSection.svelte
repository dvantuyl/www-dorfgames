<script lang="ts">
	import { colors } from '../../game';
	import Token from '../components/Token.svelte';

	export let game;

	$: tokens = $game.context.tokensRef.getSnapshot().context.tokens;

	$: disabled = (color): boolean => {
		return !$game.can({ type: 'TOKENS.SELECT', color });
	};

	function handleClick(color) {
		game.send('TOKENS.SELECT', { color });
	}
</script>

{#each colors as color}
	<button
		class="h-full w-full transform disabled:scale-90 disabled:opacity-80 disabled:cursor-not-allowed"
		value={color}
		on:click={() => handleClick(color)}
		disabled={disabled(color)}
	>
		<Token count={tokens[color]} {color} style="transform skew-y-6 skew-x-6 -rotate-3" />
	</button>
{/each}
