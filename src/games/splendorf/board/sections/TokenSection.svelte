<script>
	import { colors } from '../../game';
	import Token from '../components/Token.svelte';
	export let tokens;
</script>

<div class="w-full h-full flex flex-col items-center">
	{#each colors as color}
		<Token count={tokens[color]} {color} on:click />
	{/each}
</div>
