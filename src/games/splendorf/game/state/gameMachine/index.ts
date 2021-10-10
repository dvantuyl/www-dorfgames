import type { StateMachine } from 'xstate';
import type { GameEvent, GameCtx } from '../../types';
import { createMachine, spawn, assign, forwardTo } from 'xstate';
import { log, send } from 'xstate/lib/actions';
import { guards } from './guards';
import { actions } from './actions';
import { tokensMachine } from '../tokensMachine';
import { playersMachine } from '../playersMachine';
import { tokensInit } from '../..';

export function createGameMachine(sessionPlayerId: string): StateMachine<GameCtx, any, GameEvent> {
	return createMachine<GameCtx, GameEvent>(
		{
			id: 'gameMachine',
			initial: 'initializing',
			context: {
				sessionPlayerId,
				currentPlayerIndex: 0,
				turn: { tokens: tokensInit() },
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
