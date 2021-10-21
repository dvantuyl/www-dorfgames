<script lang="ts">
	import { Clr, colors } from '../../game';
	import TokenCard from './TokenCard.svelte';

	export let player;
	export let cardCollection;

	const initials = player.name
		.split(' ')
		.map((n) => n[0])
		.join('');

	function handleClick(cards, mode) {
		cardCollection.send('OPEN_CARD_COLLECTION', { cards, mode });
	}
</script>

<div
	class="w-full h-12 rounded bg-white bg-opacity-20 flex justify-between items-center sm:flex-wrap sm:mb-5"
>
	<div class="flex-none font-black text-red-900 text-2xl sm:w-full">
		<span class="sm:hidden">{initials}</span>
		<span class="hidden sm:inline-block">{player.name}</span>
	</div>
	{#each colors as color}
		{#if color === Clr.go}
			<button
				class="w-full sm:w-1/6 h-full"
				on:click={() => handleClick(player.cards.holds, 'holds')}
			>
				<TokenCard
					cardCount={player.cards.holds?.length || 0}
					tokenCount={player.tokens[color]}
					{color}
				/>
			</button>
		{:else}
			<button
				class="w-full sm:w-1/6 h-full"
				on:click={() => handleClick(player.cards[color], 'player')}
			>
				<TokenCard
					cardCount={player.cards[color]?.length || 0}
					tokenCount={player.tokens[color]}
					{color}
				/>
			</button>
		{/if}
	{/each}
</div>
