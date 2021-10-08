<script>
	import { writeState, nextPlayerIndex as nextPlayerIndexFn } from './game';
	import { players as playersStore } from './game/stores/players';
	import { tokens as tokensStore } from './game/stores/tokens';
	import Board from './board/Board.svelte';
	import { interpret } from 'xstate';
	import { gameMachine } from './game/state';
	import ActionSection from './board/sections/ActionSection.svelte';
	import Breadcrumbs from '$lib/header/Breadcrumbs.svelte';
	const gameService = interpret(gameMachine).start();

	export let room;
	export let state;

	$: {
		if (room.init) {
			gameService.send('SETUP', { users: room.users });
			gameService.send('PUBLISH', { callback: room.publishState });
		} else {
			gameService.send('READ', { game: state, sessionPlayerId: room.sessionPlayer.uuid });
		}
	}

	$: gameState = $gameService.context.game;

	function takeToken(event) {
		const color = event.detail.color;
		tokensStore.decrement(color);
		playersStore.player(room.sessionPlayer.uuid).tokens.increment(color);
	}

	function handleAction(event) {
		switch (event.detail.value) {
			case 'endTurn':
				const nextPlayerIndex = nextPlayerIndexFn(
					gameState.currentPlayerIndex,
					Object.values(gameState.players).length
				);
				//const gameState = writeState(...gameState, nextPlayerIndex);
				gameService.send('PUBLISH', { callback: gameState });
				break;
		}
	}
</script>

<Board {...gameState} on:takeToken={takeToken} on:action={handleAction} />
