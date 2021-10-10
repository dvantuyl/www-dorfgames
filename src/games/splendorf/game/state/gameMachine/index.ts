import type { StateMachine } from 'xstate';
import type { GameEvent, GameCtx } from '../../types';
import { createMachine, spawn, assign, forwardTo } from 'xstate';
import { log, send } from 'xstate/lib/actions';
import { guards } from './guards';
import { actions } from './actions';
import { tokensMachine } from '../tokensMachine';
import { playersMachine } from '../playersMachine';

export function createGameMachine(sessionPlayerId: string): StateMachine<GameCtx, any, GameEvent> {
	return createMachine<GameCtx, GameEvent>(
		{
			id: 'gameMachine',
			initial: 'initializing',
			context: {
				sessionPlayerId,
				currentPlayerIndex: 0,
				playersRef: null,
				tokensRef: null
			},
			states: {
				initializing: {
					entry: assign({
						playersRef: () => spawn(playersMachine, 'players'),
						tokensRef: () => spawn(tokensMachine, 'tokens')
					}),
					on: {
						SETUP: {
							target: 'waitingToPublish',
							actions: [log('GAME.SETUP'), forwardTo('players'), forwardTo('tokens')]
						},
						UPDATE: {
							target: 'waitingTurn',
							actions: [log('GAME.UPDATE'), 'update', forwardTo('players'), forwardTo('tokens')]
						}
					}
				},
				waitingToPublish: {
					entry: log('waitingToPublish'),
					on: {
						'GAME.PUBLISH': {
							target: 'waitingTurn',
							actions: [log('GAME.PUBLISH'), 'publish']
						}
					}
				},
				waitingTurn: {
					entry: log('waitingTurn'),
					always: [{ target: 'takingTurn', cond: 'isSessionPlayerTurn' }],
					on: {
						UPDATE: {
							target: 'waitingTurn',
							actions: [log('GAME.UPDATE'), 'update', forwardTo('players'), forwardTo('tokens')]
						}
					}
				},
				takingTurn: {
					entry: log('takingTurn'),
					on: {
						'TOKENS.TAKE': {
							target: 'takingTurn',
							actions: [
								log('TOKENS.TAKE'),
								forwardTo('tokens'),
								send((ctx, evt) => ({ ...evt, sessionPlayerId: ctx.sessionPlayerId }), {
									to: 'players'
								})
							]
						},
						'GAME.END_TURN': {
							target: 'waitingToPublish',
							actions: ['endTurn']
						}
					}
				}
			}
		},
		{
			actions,
			guards
		}
	);
}
