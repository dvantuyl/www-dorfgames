<script>
	import Deck from './Deck.svelte';
	import Card from './Card.svelte';

	export let game;
	export let index;

	$: row = $game.context.cardsRef.getSnapshot().context.cards[index];
</script>

<div>
	<Deck count={row.deck.length} />
</div>
{#each row.reveal as card}
	<div>
		<Card {...card} />
	</div>
{/each}
