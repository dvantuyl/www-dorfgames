<script>
	import TokenSection from './sections/TokenSection.svelte';
	import PlayerSection from './sections/PlayerSection.svelte';
	import ActionSection from './sections/ActionSection.svelte';
	import { players as playersStore } from '../game/stores/players';
	import { tokens as tokensStore } from '../game/stores/tokens';

	$: players = $playersStore.list;
	$: tokens = $tokensStore;
</script>

<div class="w-full h-full p-2 flex flex-col">
	{#if players}
		<div class="flex-none w-full">
			<PlayerSection {players} />
		</div>
	{/if}

	{#if tokens}
		<div class="w-1/6 flex-grow">
			<TokenSection {tokens} />
		</div>
	{/if}

	<div class="flex-none h-20 w-full">
		<ActionSection />
	</div>
</div>
