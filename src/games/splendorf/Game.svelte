<script>
	import { setupState, readState, writeState, nextPlayerIndex as nextPlayerIndexFn } from './game';
	import { players as playersStore } from './game/stores/players';
	import { tokens as tokensStore } from './game/stores/tokens';
	import Board from './board/Board.svelte';

	export let room;
	export let state;

	$: {
		if (room.init) {
			state = setupState(room.players);
			room.publishState(state);
		} else {
			readState(state);
		}
	}

	$: players = $playersStore.list;
	$: currentPlayerIndex = $playersStore.currentPlayerIndex;
	$: nextPlayerIndex = nextPlayerIndexFn(currentPlayerIndex, players.length);
	$: tokens = $tokensStore;

	function takeToken(event) {
		const color = event.detail.color;
		tokensStore.decrement(color);
		playersStore.player(room.sessionPlayer.uuid).tokens.increment(color);
	}

	function handleAction(event) {
		switch (event.detail.value) {
			case 'endTurn':
				state = writeState(nextPlayerIndex, players, tokens);
				room.publishState(state);
				break;
		}
	}
</script>

<Board {players} {tokens} on:takeToken={takeToken} on:action={handleAction} />
