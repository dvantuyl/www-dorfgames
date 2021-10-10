import { assign } from 'xstate';
import { tokensInit } from '../..';
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
	selectTurnTokens: assign({
		turn: (ctx: GameCtx, evt: GameEvent) => {
			if (evt.type !== 'TOKENS.SELECT') return ctx.turn;
			return {
				...ctx.turn,
				tokens: { ...ctx.turn.tokens, [evt.color]: ctx.turn.tokens[evt.color] + 1 }
			};
		}
	}),
	resetTurn: assign({
		turn: { tokens: tokensInit() }
	}),
	endTurn: assign({
		currentPlayerIndex: nextPlayerIndex,
		turn: { tokens: tokensInit() }
	})
};

function nextPlayerIndex(context: GameCtx): number {
	const currentPlayerIndex = context.currentPlayerIndex;
	const { players } = context.playersRef.getSnapshot().context;
	const numPlayers = Object.values(players).length;
	return currentPlayerIndex === numPlayers - 1 ? 0 : currentPlayerIndex + 1;
}
