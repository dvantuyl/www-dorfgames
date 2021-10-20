<script>
	import { pick } from 'lodash';
	import Deck from '../components/Deck.svelte';
	import Card from '../components/Card.svelte';

	export let game;
	export let cardView;
	export let row;

	$: cards = $game.context.cards[row];

	function handleClick(index) {
		cardView.send('OPEN_CARD_VIEW', { cards: cards.reveal, index, mode: 'board' });
	}
</script>

<div style="grid-area: R${row}D">
	<Deck count={cards.deck.length} {row} />
</div>
{#each cards.reveal as card, i}
	<div style="grid-area: R${row}${i}">
		{#if card}
			<button class="w-full h-full max-w-xs" on:click={() => handleClick(i)}>
				<Card {...pick(card, ['clr', 'pts', 'cost'])} />
			</button>
		{:else}
			<div class="w-full h-full max-w-xs">&#8203;</div>
		{/if}
	</div>
{/each}
