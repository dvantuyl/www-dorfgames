import type { GameEvt, GameCtx } from './types';
import { assign } from 'xstate';
import { createTokens } from './tokens';

export const actions = {
	update: assign({
		currentPlayerIndex: (_, event: GameEvt) => {
			if (event.type !== 'UPDATE') return;
			return event.game.currentPlayerIndex;
		}
	}),
	publish: (context: GameCtx, event: GameEvt): void => {
		if (event.type !== 'GAME.PUBLISH') return;
		const { players } = context.playersRef.getSnapshot().context;
		const { tokens } = context.tokensRef.getSnapshot().context;
		const { cards } = context.cardsRef.getSnapshot().context;
		const currentPlayerIndex = context.currentPlayerIndex;
		event.callback({ players, tokens, cards, currentPlayerIndex });
	},
	selectTurnTokens: assign({
		turn: (ctx: GameCtx, evt: GameEvt) => {
			if (evt.type !== 'TOKENS.SELECT') return ctx.turn;
			return {
				...ctx.turn,
				tokens: { ...ctx.turn.tokens, [evt.color]: ctx.turn.tokens[evt.color] + 1 }
			};
		}
	}),
	resetTurn: assign({
		turn: { tokens: createTokens() }
	}),
	endTurn: assign({
		currentPlayerIndex: nextPlayerIndex,
		turn: { tokens: createTokens() }
	})
};

function nextPlayerIndex(context: GameCtx): number {
	const currentPlayerIndex = context.currentPlayerIndex;
	const { players } = context.playersRef.getSnapshot().context;
	const numPlayers = Object.values(players).length;
	return currentPlayerIndex === numPlayers - 1 ? 0 : currentPlayerIndex + 1;
}
