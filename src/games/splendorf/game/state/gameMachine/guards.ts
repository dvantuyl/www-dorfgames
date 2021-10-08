import type { GameCtx, GameEvent } from '../../types';

export const guards = {
	isSessionPlayerTurn: (context: GameCtx): boolean => {
		const sessionPlayerId = context.local.sessionPlayerId;
		const currentPlayerIndex = context.game.currentPlayerIndex;
		const players = context.game.players;
		return players[sessionPlayerId].index === currentPlayerIndex;
	},
	notSessionPlayerTurn: (context: GameCtx): boolean => {
		const sessionPlayerId = context.local.sessionPlayerId;
		const currentPlayerIndex = context.game.currentPlayerIndex;
		const players = context.game.players;
		return players[sessionPlayerId].index !== currentPlayerIndex;
	},
	canTakeToken: (context: GameCtx, event: GameEvent): boolean => {
		if (event.type !== 'TAKE_TOKEN') return;
		return true;
	}
};
