<script>
	import Board from './board/Board.svelte';
	import shuffle from 'lodash/shuffle.js';
	import { interpret } from 'xstate';
	import { createGameMachine, cardViewMachine, cardCollectionMachine } from './game';
	import { onMount } from 'svelte';

	export let room;
	export let state;
	export let setup;

	let gameMachine;
	let game;
	let cardView;
	let cardCollection;
	let initialized = false;

	onMount(() => {
		gameMachine = createGameMachine(room.sessionUser.id);
		game = interpret(gameMachine).start();
		cardView = interpret(cardViewMachine).start();
		cardCollection = interpret(cardCollectionMachine).start();
		if (setup) {
			game.send('SETUP', { users: shuffle(room.users) });
			game.send('PUBLISH', { callback: room.publishState });
		}
		initialized = true;
	});

	$: if (initialized && state) {
		game.send('UPDATE', { history: state });
	}
</script>

{#if initialized}
	<Board {game} {cardView} {cardCollection} {room} />
{/if}
