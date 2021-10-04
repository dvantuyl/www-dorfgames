<script>
	import { publishState } from '$lib/room';
	import { setupState, readState, writeState, nextPlayerIndex as nextPlayerIndexFn } from './game';
	import { players as playersStore } from './game/stores/players';
	import { tokens as tokensStore } from './game/stores/tokens';
	import Board from './board/Board.svelte';

	export let ctx;
	export let state;
	export let users;
	export let sessionUserId;

	$: {
		if (ctx.stateIndex === 1) {
			state = setupState(users);
			publishState({ ...ctx, state });
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
		playersStore.player(sessionUserId).tokens.increment(color);
	}

	function handleAction(event) {
		switch (event.detail.value) {
			case 'endTurn':
				state = writeState(nextPlayerIndex, players, tokens);
				publishState({ ...ctx, state });
				break;
		}
	}
</script>

<Board {players} {tokens} on:takeToken={takeToken} on:action={handleAction} />
