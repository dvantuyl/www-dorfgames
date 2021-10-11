import type { StateMachine } from 'xstate/lib/types';
import type { CardsEvt, CardsCtx } from '../types';
import { createMachine, sendUpdate } from 'xstate';
import { assign, log, send } from 'xstate/lib/actions.js';
import { gameCards } from './cards.model';

export const cardsMachine: StateMachine<CardsCtx, any, CardsEvt> = createMachine({
	id: 'cardsMachine',
	context: {
		prev: gameCards,
		cards: gameCards
	},
	initial: 'waiting',
	states: {
		waiting: {
			on: {
				SETUP: {
					target: 'updatingGame',
					actions: assign({
						prev: gameCards,
						cards: gameCards
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
