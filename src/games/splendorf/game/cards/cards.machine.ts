import type { StateMachine } from 'xstate/lib/types';
import type { Card, Cards, Game } from '../types';
import { createMachine, sendUpdate } from 'xstate';
import { cloneDeep } from 'lodash';
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
			prev: cards,
			cards: cards
		},
		initial: 'waiting',
		states: {
			waiting: {
				on: {
					SETUP: {
						target: 'updatingGame',
						actions: assign({
							prev: cloneDeep(cards),
							cards: cloneDeep(cards)
						})
					},
					UPDATE: {
						target: 'updatingGame',
						actions: assign({
							prev: (_, event) => cloneDeep(event.game.cards),
							cards: (_, event) => cloneDeep(event.game.cards)
						})
					},
					'GAME.RESET_TURN': {
						target: 'updatingGame',
						actions: assign({
							cards: (ctx) => cloneDeep(ctx.prev)
						})
					},
					'CARDS.BUY': {
						target: 'updatingGame',
						actions: 'buy'
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
