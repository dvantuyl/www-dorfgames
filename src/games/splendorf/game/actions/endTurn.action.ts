import type { GameCtx, GameEvt } from '../types';
import { assign } from 'xstate';
import { createTokens } from '../models';

export const endTurn = assign({
	currentPlayerIndex: nextPlayerIndex,
	turn: () => ({ selectedTokens: createTokens() })
});

function nextPlayerIndex(ctx: GameCtx): number {
	const currentPlayerIndex = ctx.currentPlayerIndex;
	const numPlayers = Object.values(ctx.players).length;
	return currentPlayerIndex === numPlayers - 1 ? 0 : currentPlayerIndex + 1;
}
