<script>
	import pick from 'lodash/pick.js';
	import Deck from '../components/Deck.svelte';
	import Card from '../components/Card.svelte';

	export let game;
	export let row;

	$: cards = $game.context.cardsRef.getSnapshot().context.cards[row];

	function handleClick(index) {
		$game.context.cardViewerRef.send('CARD_VIEWER.OPEN', { cards: cards.reveal, index });
	}
</script>

<div style="grid-area: R${row}D">
	<Deck count={cards.deck.length} />
</div>
{#each cards.reveal as card, i}
	<div style="grid-area: R${row}${i}">
		<button class="w-full h-full max-w-xs" on:click={() => handleClick(i)}>
			<Card {...pick(card, ['clr', 'pts', 'cost'])} />
		</button>
	</div>
{/each}
