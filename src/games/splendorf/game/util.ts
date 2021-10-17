import type { GameCtx, Player } from './types';

export function sessionPlayer(ctx: GameCtx): Player {
	return ctx.players[ctx.sessionPlayerId];
}
