<script>
	import Deck from '../components/Deck.svelte';
	import Card from '../components/Card.svelte';

	export let game;
	export let row;

	$: cards = $game.context.cardsRef.getSnapshot().context.cards[row];
</script>

<div style="grid-area: R${row}D">
	<Deck count={cards.deck.length} />
</div>
{#each [0, 1, 2, 3] as i}
	<div style="grid-area: R${row}${i}">
		<div class="w-full h-full max-w-xs">
			<Card {...cards.reveal[i]} />
		</div>
	</div>
{/each}
