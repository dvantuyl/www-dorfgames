import type { StateMachine } from 'xstate';
import { createMachine, assign } from 'xstate';
import type { Card } from './types';

type Mode = 'board' | 'player' | 'holds';
export interface CardViewCtx {
	cards: Card[];
	index: number;
	mode: Mode;
}

export type CardViewEvt =
	| { type: 'OPEN_CARD_VIEW'; cards: Card[]; index: number; mode: Mode }
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
			index: 0,
			mode: 'board'
		},
		states: {
			closed: {
				on: {
					OPEN_CARD_VIEW: {
						actions: [
							assign({
								cards: (_, evt) => evt.cards,
								index: (_, evt) => evt.index,
								mode: (_, evt) => evt.mode
							})
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
							})
						]
					},
					NEXT_CARD: {
						cond: 'hasNextCard',
						actions: [
							assign({
								index: (ctx) => ctx.index + 1
							})
						]
					},
					CLOSE_CARD_VIEW: {
						target: 'closed'
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
