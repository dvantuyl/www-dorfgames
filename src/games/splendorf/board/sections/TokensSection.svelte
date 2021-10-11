<script lang="ts">
	import { colors } from '../../game/index';
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

<div class="w-full h-full flex flex-col items-center">
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
</div>
