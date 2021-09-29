<script>
	import { colors } from '../../game';
	import Token from '../components/Token.svelte';
	export let tokens;

	function takeToken(event) {
		const color = event.detail.color;
		console.log('takeToken', color);
		// tokens.decrement(color)
		// players.player(sessionPlayerId).tokens.increment(color)
	}
</script>

<div class="w-full h-full flex flex-col items-center">
	{#each colors as color}
		<Token count={tokens[color]} {color} on:click={takeToken} />
	{/each}
</div>
