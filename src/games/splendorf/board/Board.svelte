<script>
	import TokenSection from './sections/TokenSection.svelte';
	import PlayerSection from './sections/PlayerSection.svelte';
	import ActionSection from './sections/ActionSection.svelte';
	import { createEventDispatcher } from 'svelte';

	export let players;
	export let tokens;

	const dispatch = createEventDispatcher();

	function forwardTakeToken(event) {
		dispatch('takeToken', event.detail);
	}
</script>

<div class="w-full h-full p-2 flex flex-col">
	{#if players}
		<div class="flex-none w-full">
			<PlayerSection {players} />
		</div>
	{/if}

	{#if tokens}
		<div class="w-1/6 flex-grow">
			<TokenSection {tokens} on:click={forwardTakeToken} />
		</div>
	{/if}

	<div class="flex-none h-20 w-full">
		<ActionSection on:action />
	</div>
</div>
