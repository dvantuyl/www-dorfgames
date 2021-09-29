<script>
	import { setupState, updateState } from '../splendorf/game';
	import Board from './board/Board.svelte';

	export const title = 'Splendorf';
	export let state;
	export let users;
	export let sessionUserId;

	$: {
		if (state.i === 1) {
			state = setupState(users);
		} else {
			updateState(state);
		}
	}
</script>

<Board {sessionUserId} />
