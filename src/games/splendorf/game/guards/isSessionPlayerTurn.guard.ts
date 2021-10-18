import type { GameCtx } from '../types';
import { sessionPlayer } from '../util';

export function isSessionPlayerTurn(ctx: GameCtx): boolean {
	return sessionPlayer(ctx)?.index === ctx.currentPlayerIndex;
}
