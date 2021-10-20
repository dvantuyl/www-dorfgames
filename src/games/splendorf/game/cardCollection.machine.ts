import type { StateMachine } from 'xstate';
import { createMachine, assign } from 'xstate';
import type { Card } from './types';

export interface CardCollectionCtx {
	cards: Card[];
}

export type CardCollectionEvt =
	| { type: 'OPEN_CARD_COLLECTION'; cards?: Card[] }
	| { type: 'PREV_COLLECTION' }
	| { type: 'NEXT_COLLECTION' }
	| { type: 'CLOSE_CARD_COLLECTION' };

export const cardCollectionMachine: StateMachine<CardCollectionCtx, any, CardCollectionEvt> =
	createMachine<CardCollectionCtx, CardCollectionEvt>(
		{
			id: 'cardCollection',
			initial: 'closed',
			context: {
				cards: []
			},
			states: {
				closed: {
					on: {
						OPEN_CARD_COLLECTION: {
							actions: [
								assign({
									cards: (ctx, evt) => evt.cards || ctx.cards
								})
							],
							target: 'opened'
						}
					}
				},
				opened: {
					on: {
						PREV_COLLECTION: {
							cond: 'hasPrevCollection',
							actions: []
						},
						NEXT_COLLECTION: {
							cond: 'hasNextCollection',
							actions: []
						},
						CLOSE_CARD_COLLECTION: {
							target: 'closed'
						}
					}
				}
			}
		},
		{
			guards: {
				hasPrevCollection,
				hasNextCollection
			}
		}
	);

export function hasPrevCollection(ctx: CardCollectionCtx): boolean {
	return false;
}

export function hasNextCollection(ctx: CardCollectionCtx): boolean {
	return false;
}
