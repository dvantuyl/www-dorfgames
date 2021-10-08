<script>
	import { writeState, nextPlayerIndex as nextPlayerIndexFn } from './game';
	import { players as playersStore } from './game/stores/players';
	import { tokens as tokensStore } from './game/stores/tokens';
	import Board from './board/Board.svelte';
	import { interpret } from 'xstate';
	import { gameMachine } from './game/state/gameMachine';
	const gameService = interpret(gameMachine).start();

	export let room;
	export let state;

	$: {
		if (room.init) {
			gameService.send('SETUP', { users: room.users });
			gameService.send('PUBLISH', { callback: room.publishState });
		} else {
			gameService.send('READ', { game: state });
		}
	}

	$: gameState = $gameService.context.game;
	$: players = gameState.players.list;
	$: currentPlayerIndex = gameState.players.currentPlayerIndex;
	$: nextPlayerIndex = nextPlayerIndexFn(currentPlayerIndex, players.length);
	$: tokens = gameState.tokens;

	function takeToken(event) {
		const color = event.detail.color;
		tokensStore.decrement(color);
		playersStore.player(room.sessionPlayer.uuid).tokens.increment(color);
	}

	function handleAction(event) {
		switch (event.detail.value) {
			case 'endTurn':
				const gameState = writeState(nextPlayerIndex, players, tokens);
				gameService.send('PUBLISH', { callback: gameState });
				break;
		}
	}
</script>

<Board {players} {tokens} on:takeToken={takeToken} on:action={handleAction} />
