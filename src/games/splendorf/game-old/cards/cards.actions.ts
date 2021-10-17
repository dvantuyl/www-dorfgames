import type { CardsCtx, CardsEvt } from './cards.machine';
import type { Cards } from '../types';
import { cloneDeep } from 'lodash';
import { assign } from 'xstate';

export const actions = {
	buy: assign({
		cards: buy
	})
};

function buy(ctx: CardsCtx, evt: CardsEvt): Cards {
	if (evt.type !== 'CARDS.BUY') return;

	const row = ctx.cards[evt.card.row];
	row.reveal[evt.index] = row.deck.pop();
	return cloneDeep(ctx.cards);
}
