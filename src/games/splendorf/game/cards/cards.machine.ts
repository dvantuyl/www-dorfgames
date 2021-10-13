import type { StateMachine } from 'xstate/lib/types';
import type { Cards, Game } from '../types';
import { createMachine, sendUpdate } from 'xstate';
import { assign, log, send } from 'xstate/lib/actions.js';
import { cards } from './cards.model';

export interface CardsCtx {
	prev: Cards;
	cards: Cards;
}

export type CardsEvt =
	| { type: 'SETUP' }
	| { type: 'UPDATE'; game: Game }
	| { type: 'GAME.RESET_TURN' }
	| { type: 'CARDS.BUY'; row: number; id: number }
	| { type: 'CARDS.HOLD'; row: number; id: number };

export const cardsMachine: StateMachine<CardsCtx, any, CardsEvt> = createMachine({
	id: 'cardsMachine',
	context: {
		prev: cards,
		cards
	},
	initial: 'waiting',
	states: {
		waiting: {
			on: {
				SETUP: {
					target: 'updatingGame',
					actions: assign({
						prev: cards,
						cards
					})
				},
				UPDATE: {
					target: 'updatingGame',
					actions: assign({
						prev: (_, event) => event.game.cards,
						cards: (_, event) => event.game.cards
					})
				},
				'GAME.RESET_TURN': {
					target: 'updatingGame',
					actions: assign({
						cards: (ctx) => ctx.prev
					})
				},
				'CARDS.BUY': {
					target: 'updatingGame'
				},
				'CARDS.HOLD': {
					target: 'updatingGame'
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
});
