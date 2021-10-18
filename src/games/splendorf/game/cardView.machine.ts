import type { StateMachine } from 'xstate';
import { sendUpdate, createMachine, assign } from 'xstate';
import type { Card } from './types';

export interface CardViewCtx {
	cards: Card[];
	index: number;
}

export type CardViewEvt =
	| { type: 'OPEN_CARD_VIEW'; cards: Card[]; index: number }
	| { type: 'PREV_CARD' }
	| { type: 'NEXT_CARD' }
	| { type: 'CLOSE_CARD_VIEW' };

export const cardViewMachine: StateMachine<CardViewCtx, any, CardViewEvt> = createMachine<
	CardViewCtx,
	CardViewEvt
>(
	{
		id: 'cardView',
		initial: 'closed',
		context: {
			cards: [],
			index: 0
		},
		states: {
			closed: {
				on: {
					OPEN_CARD_VIEW: {
						actions: [
							assign({
								cards: (_, evt) => evt.cards,
								index: (_, evt) => evt.index
							}),
							sendUpdate()
						],
						target: 'opened'
					}
				}
			},
			opened: {
				on: {
					PREV_CARD: {
						cond: 'hasPrevCard',
						actions: [
							assign({
								index: (ctx) => ctx.index - 1
							}),
							sendUpdate()
						]
					},
					NEXT_CARD: {
						cond: 'hasNextCard',
						actions: [
							assign({
								index: (ctx) => ctx.index + 1
							}),
							sendUpdate()
						]
					},
					CLOSE_CARD_VIEW: {
						target: 'closed',
						actions: sendUpdate()
					}
				}
			}
		}
	},
	{
		guards: {
			hasPrevCard,
			hasNextCard
		}
	}
);

export function hasPrevCard(ctx: CardViewCtx): boolean {
	return ctx.index > 0;
}

export function hasNextCard(ctx: CardViewCtx): boolean {
	return ctx.index < ctx.cards.length - 1;
}
