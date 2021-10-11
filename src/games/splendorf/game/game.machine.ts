import type { StateMachine } from 'xstate';
import type { GameEvt, GameCtx } from './types';
import { createMachine, spawn, assign, forwardTo } from 'xstate';
import { log, send } from 'xstate/lib/actions.js';
import { guards } from './game.guards';
import { actions } from './game.actions';
import { tokensMachine } from './tokens';
import { playersMachine } from './players';
import { createGameCtx } from './game.model';

export function createGameMachine(sessionPlayerId: string): StateMachine<GameCtx, any, GameEvt> {
	return createMachine<GameCtx, GameEvt>(
		{
			id: 'gameMachine',
			initial: 'initializing',
			context: createGameCtx({
				sessionPlayerId
			}),
			states: {
				initializing: {
					entry: assign({
						playersRef: () => spawn(playersMachine, 'players'),
						tokensRef: () => spawn(tokensMachine, 'tokens')
					}),
					on: {
						SETUP: {
							target: 'waitingToPublish',
							actions: [forwardTo('players'), forwardTo('tokens')]
						},
						UPDATE: {
							target: 'waitingTurn',
							actions: ['update', forwardTo('players'), forwardTo('tokens')]
						}
					}
				},
				waitingToPublish: {
					on: {
						'GAME.PUBLISH': {
							target: 'waitingTurn',
							actions: ['publish']
						}
					}
				},
				waitingTurn: {
					always: [{ target: 'takingTurn', cond: 'isSessionPlayerTurn' }],
					on: {
						UPDATE: {
							target: 'waitingTurn',
							actions: ['update', forwardTo('players'), forwardTo('tokens')]
						}
					}
				},
				takingTurn: {
					on: {
						'TOKENS.SELECT': {
							actions: send((_, evt) => ({ ...evt })),
							target: 'selectingTokens',
							cond: 'canSelectToken'
						},
						'GAME.END_TURN': {
							target: 'waitingToPublish',
							actions: ['endTurn']
						}
					}
				},
				selectingTokens: {
					on: {
						'TOKENS.SELECT': {
							cond: 'canSelectToken',
							actions: [
								'selectTurnTokens',
								forwardTo('tokens'),
								send((ctx, evt) => ({ ...evt, sessionPlayerId: ctx.sessionPlayerId }), {
									to: 'players'
								})
							]
						},
						'GAME.RESET_TURN': {
							target: 'takingTurn',
							actions: ['resetTurn', forwardTo('players'), forwardTo('tokens')]
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
