<script>
	import Board from './board/Board.svelte';
	import shuffle from 'lodash/shuffle.js';
	import { interpret } from 'xstate';
	import { createGameMachine } from './game';
	import { onMount } from 'svelte';

	export let room;
	export let state;
	export let setup;

	let gameMachine;
	let game;
	let initialized = false;

	onMount(() => {
		gameMachine = createGameMachine(room.sessionUser.id);
		game = interpret(gameMachine).start();
		if (setup) {
			game.send('SETUP', { users: shuffle(room.users) });
			game.send('GAME.PUBLISH', { callback: room.publishState });
		}
		initialized = true;
	});

	$: if (initialized && state) {
		console.log('received UPDATE', state);
		game.send('UPDATE', { game: state });
	}
</script>

{#if initialized}
	<Board {game} {room} />
{/if}
