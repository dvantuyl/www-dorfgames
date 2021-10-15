import type { GameCtx, GameEvt } from './game.machine';
import type { Color, Player } from './types';
import sum from 'lodash/sum.js';
import reduce from 'lodash/reduce.js';
import { Clr, colors } from './colors';

export const guards = {
	canBuyCard: (ctx: GameCtx, evt): boolean => {
		const player = sessionPlayer(ctx);
		console.log('player.guards', player.tokens[Clr.go]);
		return (
			player.tokens[Clr.go] >=
			colors
				.map((clr: Color) => {
					const cardCount = player.cards[clr].length;
					const tokenCount = player.tokens[clr];
					const clrCount = tokenCount + cardCount;

					if (clrCount <= evt.card.cost[clr]) {
						return evt.card.cost[clr] - clrCount;
					} else {
						return 0;
					}
				})
				.reduce((a, c) => a + c)
		);
	}
};

function sessionPlayer(ctx: GameCtx): Player {
	const sessionPlayerId = ctx.sessionPlayerId;
	const players = ctx.playersRef.getSnapshot().context.players;
	return players[sessionPlayerId];
}
