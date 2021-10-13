<script>
	import pick from 'lodash/pick.js';
	import Deck from '../components/Deck.svelte';
	import Card from '../components/Card.svelte';

	export let game;
	export let row;

	$: cards = $game.context.cardsRef.getSnapshot().context.cards[row];
</script>

<div style="grid-area: R${row}D">
	<Deck count={cards.deck.length} />
</div>
{#each cards.reveal as card, i}
	<div style="grid-area: R${row}${i}">
		<div class="w-full h-full max-w-xs">
			<Card {...pick(card, ['clr', 'pts', 'cost'])} />
		</div>
	</div>
{/each}
