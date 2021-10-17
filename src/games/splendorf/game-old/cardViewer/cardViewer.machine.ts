import type { StateMachine } from 'xstate';
import { sendUpdate, createMachine, send, assign } from 'xstate';
import type { Card } from '../types';

export interface CardViewerCtx {
	cards: Card[];
	index: number;
}

export type CardViewerEvt =
	| { type: 'CARD_VIEWER.OPEN'; cards: Card[]; index: number }
	| { type: 'CARD_VIEWER.PREV' }
	| { type: 'CARD_VIEWER.NEXT' }
	| { type: 'CARD_VIEWER.CLOSE' };

export const cardViewerMachine: StateMachine<CardViewerCtx, any, CardViewerEvt> = createMachine<
	CardViewerCtx,
	CardViewerEvt
>(
	{
		id: 'cardViewer',
		initial: 'closed',
		context: {
			cards: [],
			index: 0
		},
		states: {
			closed: {
				on: {
					'CARD_VIEWER.OPEN': {
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
					'CARD_VIEWER.PREV': {
						cond: 'hasPrevCard',
						actions: [
							assign({
								index: (ctx) => ctx.index - 1
							}),
							sendUpdate()
						]
					},
					'CARD_VIEWER.NEXT': {
						cond: 'hasNextCard',
						actions: [
							assign({
								index: (ctx) => ctx.index + 1
							}),
							sendUpdate()
						]
					},
					'CARD_VIEWER.CLOSE': {
						target: 'closed',
						actions: sendUpdate()
					}
				}
			}
		}
	},
	{
		guards: {
			hasPrevCard: (ctx: CardViewerCtx): boolean => ctx.index > 0,
			hasNextCard: (ctx: CardViewerCtx): boolean => ctx.index < ctx.cards.length - 1
		}
	}
);
