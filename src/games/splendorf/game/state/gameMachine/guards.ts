import type { GameCtx } from '../../types';

export const guards = {
	isSessionPlayerTurn: (context: GameCtx): boolean => {
		const sessionPlayerId = context.sessionPlayerId;
		const currentPlayerIndex = context.currentPlayerIndex;
		const players = context.playersRef.getSnapshot().context.players;
		return players[sessionPlayerId]?.index === currentPlayerIndex;
	}
};
