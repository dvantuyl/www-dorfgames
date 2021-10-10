<script lang="ts">
	import { colors } from '../../game/index';
	import Token from '../components/Token.svelte';

	export let game;

	$: tokens = $game.context.tokensRef.getSnapshot().context.tokens;

	function handleClick(event) {
		const color = event.detail.color;
		game.send('TOKENS.SELECT', { color });
	}
</script>

<div class="w-full h-full flex flex-col items-center">
	{#each colors as color}
		<Token count={tokens[color]} {color} on:click={handleClick} />
	{/each}
</div>
