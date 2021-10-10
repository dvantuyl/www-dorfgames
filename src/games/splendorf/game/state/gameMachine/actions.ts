import { assign } from 'xstate';
import type { GameEvent, GameCtx } from '../../types';

export const actions = {
	update: assign({
		currentPlayerIndex: (_, event: GameEvent) => {
			if (event.type !== 'UPDATE') return;
			return event.game.currentPlayerIndex;
		}
	}),
	publish: (context: GameCtx, event: GameEvent): void => {
		if (event.type !== 'GAME.PUBLISH') return;
		const { players } = context.playersRef.getSnapshot().context;
		const { tokens } = context.tokensRef.getSnapshot().context;
		const currentPlayerIndex = context.currentPlayerIndex;
		event.callback({ players, tokens, currentPlayerIndex });
	},
	endTurn: assign({
		currentPlayerIndex: nextPlayerIndex
	})
};

function nextPlayerIndex(context: GameCtx): number {
	const currentPlayerIndex = context.currentPlayerIndex;
	const { players } = context.playersRef.getSnapshot().context;
	const numPlayers = Object.values(players).length;
	return currentPlayerIndex === numPlayers - 1 ? 0 : currentPlayerIndex + 1;
}
