import type { StateMachine } from 'xstate/lib/types';
import type { Card, Cards, Game } from '../types';
import { createMachine, sendUpdate } from 'xstate';
import { assign } from 'xstate/lib/actions.js';
import { cards } from './cards.model';
import { actions } from './cards.actions';

export interface CardsCtx {
	prev: Cards;
	cards: Cards;
}

export type CardsEvt =
	| { type: 'SETUP' }
	| { type: 'UPDATE'; game: Game }
	| { type: 'GAME.RESET_TURN' }
	| { type: 'CARDS.BUY'; card: Card; index: number };

export const cardsMachine: StateMachine<CardsCtx, any, CardsEvt> = createMachine<
	CardsCtx,
	CardsEvt
>(
	{
		id: 'cardsMachine',
		context: {
			prev: { ...cards },
			cards: { ...cards }
		},
		initial: 'waiting',
		states: {
			waiting: {
				on: {
					SETUP: {
						target: 'updatingGame',
						actions: assign({
							prev: { ...cards },
							cards: { ...cards }
						})
					},
					UPDATE: {
						target: 'updatingGame',
						actions: [
							assign({
								prev: (_, event) => event.game.cards,
								cards: (_, event) => event.game.cards
							}),
							(ctx, evt) =>
								console.log('GAME.RESET_TURN', ctx.prev[0].reveal[0], ctx.cards[0].reveal[0])
						]
					},
					'GAME.RESET_TURN': {
						target: 'updatingGame',
						actions: [
							assign({
								cards: (ctx) => ({ ...ctx.prev })
							}),
							(ctx, evt) =>
								console.log('GAME.RESET_TURN', ctx.prev[0].reveal[0], ctx.cards[0].reveal[0])
						]
					},
					'CARDS.BUY': {
						target: 'updatingGame',
						actions: [
							'buy',
							(ctx, evt) => console.log('CARDS.BUY', ctx.prev[0].reveal[0], ctx.cards[0].reveal[0])
						]
					}
				}
			},
			updatingGame: {
				always: [
					{
						target: 'waiting',
						actions: sendUpdate()
					}
				]
			}
		}
	},
	{ actions }
);
