import type { GameCtx, GameEvt } from './game.machine';
import type { Player } from './types';
import { guards as tokenGuards } from './token.guards';
import { guards as cardGuards } from './card.guards';

export const guards = {
	isSessionPlayerTurn: (ctx: GameCtx): boolean => {
		return sessionPlayer(ctx)?.index === ctx.currentPlayerIndex;
	},
	...cardGuards,
	...tokenGuards
};

function sessionPlayer(ctx: GameCtx): Player {
	const sessionPlayerId = ctx.sessionPlayerId;
	const players = ctx.playersRef.getSnapshot().context.players;
	return players[sessionPlayerId];
}
