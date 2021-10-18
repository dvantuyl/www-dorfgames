import type { GameCtx, GameEvt, Player, Tokens, Card, Color } from '../types';
import { assign } from 'xstate';
import { Clr } from '../models';
import { sessionPlayer } from '../util';

export const buyCard = assign((ctx: GameCtx, evt: GameEvt) => {
	if (evt.type !== 'BUY_CARD') return;

	const player = sessionPlayer(ctx);
	const row = ctx.cards[evt.card.row];

	if (!row) return;

	const card = row.reveal[evt.index];

	if (!card) return;

	row.reveal[evt.index] = null;

	[Clr.bk, Clr.wh, Clr.re, Clr.bl, Clr.gr].forEach((clr: Color) => {
		const cardCount = player.cards[clr].length;
		const tokenCount = player.tokens[clr];
		const clrCount = tokenCount + cardCount;

		// Use gold if player token + cards are < cost
		if (clrCount < card.cost[clr]) {
			const costDelta = card.cost[clr] - clrCount;
			ctx.tokens[Clr.go] += costDelta;
			ctx.tokens[clr] += player.tokens[clr];
			player.tokens[Clr.go] -= costDelta;
			player.tokens[clr] = 0;

			// Use player tokens if player cards are < cost
		} else if (cardCount < card.cost[clr]) {
			const costDelta = card.cost[clr] - cardCount;
			player.tokens[clr] -= costDelta;
			ctx.tokens[clr] += costDelta;
		}
	});

	player.score += card.pts;
	player.cards[card.clr] = [...player.cards[card.clr], card];

	return { ...ctx };
});
