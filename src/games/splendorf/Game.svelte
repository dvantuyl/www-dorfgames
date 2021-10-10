<script>
	import Board from './board/Board.svelte';
	import { interpret } from 'xstate';
	import { createGameMachine } from './game';

	export let room;
	export let state;
	export let setup;

	let gameMachine;
	let game;

	$: if (room && room.sessionUser) {
		gameMachine = createGameMachine(room.sessionUser.id);
		game = interpret(gameMachine).start();
	}

	$: if (game) {
		if (setup) {
			game.send('SETUP', { users: room.users });
			game.send('GAME.PUBLISH', { callback: room.publishState });
		} else {
			console.log('received UPDATE', state);
			game.send('UPDATE', { game: state });
		}
	}

	function handleAction(event) {
		switch (event.detail.value) {
			case 'endTurn':
				game.send('END_TURN');
				game.send('GAME.PUBLISH', { callback: room.publishState });
				break;
		}
	}
</script>

<Board {game} {room} />
