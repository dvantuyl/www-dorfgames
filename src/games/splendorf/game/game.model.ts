import { createTokens } from './tokens';
import type { GameCtx } from './types';

const gameCtx = {
	sessionPlayerId: null,
	currentPlayerIndex: 0,
	turn: { tokens: createTokens() },
	playersRef: null,
	tokensRef: null
};

export function createGameCtx(params: Partial<GameCtx> = {}): GameCtx {
	return { ...gameCtx, ...params };
}
