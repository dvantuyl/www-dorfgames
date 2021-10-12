<script>
	import Deck from './Deck.svelte';
	import Card from './Card.svelte';

	export let game;
	export let index;

	$: row = $game.context.cardsRef.getSnapshot().context.cards[index];
</script>

<Deck count={row.deck.length} />
{#each row.reveal as card}
	<div class="w-full h-full">
		<Card {...card} />
	</div>
{/each}
