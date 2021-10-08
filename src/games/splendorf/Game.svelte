<script>
	import Board from './board/Board.svelte';
	import { interpret } from 'xstate';
	import { createGameMachine } from './game/state';

	export let room;
	export let state;
	export let setup;

	let gameService;

	$: if (room && room.sessionUser) {
		const gameMachine = createGameMachine(room.sessionUser.id);
		gameService = interpret(gameMachine).start();
	}

	$: if (gameService) {
		if (setup) {
			gameService.send('SETUP', { users: room.users });
			gameService.send('PUBLISH', { callback: room.publishState });
		} else {
			gameService.send('READ', { game: state });
		}
	}

	$: gameState = $gameService.context.game;

	function takeToken(event) {
		const color = event.detail.color;
		gameService.send('TAKE_TOKEN', { color });
	}

	function handleAction(event) {
		switch (event.detail.value) {
			case 'endTurn':
				gameService.send('END_TURN');
				gameService.send('PUBLISH', { callback: room.publishState });
				break;
		}
	}
</script>

<Board {...gameState} on:takeToken={takeToken} on:action={handleAction} />
