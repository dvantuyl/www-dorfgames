import type { GameCtx, GameEvt, Color } from '../types';
import { sessionPlayer } from '../util';
import { Clr, colors } from '../models';

export function canBuyCard(ctx: GameCtx, evt: GameEvt): boolean {
	if (evt.type !== 'BUY_CARD' || !evt.card) return;

	const player = sessionPlayer(ctx);

	return (
		player.tokens[Clr.go] >=
		colors
			.map((clr: Color) => {
				const cardCount = player.cards[clr]?.length || 0;
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
