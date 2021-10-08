import type { GameCtx } from '../../types';

export const guards = {
	isSessionPlayerTurn: (context: GameCtx): boolean => {
		const sessionPlayerId = context.local.sessionPlayerId;
		const currentPlayerIndex = context.game.currentPlayerIndex;
		const players = context.game.players;
		return players[sessionPlayerId].index === currentPlayerIndex;
	},
	notPlayerTurn: (context: GameCtx): boolean => {
		const sessionPlayerId = context.local.sessionPlayerId;
		const currentPlayerIndex = context.game.currentPlayerIndex;
		const players = context.game.players;
		return players[sessionPlayerId].index !== currentPlayerIndex;
	}
};
