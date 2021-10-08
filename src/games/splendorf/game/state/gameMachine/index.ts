import { createMachine } from 'xstate';
import type { StateMachine } from 'xstate';
import type { GameEvent, GameCtx } from '../../types';
import { actions } from './actions';
import { guards } from './guards';

export function createGameMachine(sessionPlayerId: string): StateMachine<GameCtx, any, GameEvent> {
	return createMachine<GameCtx, GameEvent>(
		{
			id: 'gameMachine',
			initial: 'initializing',
			context: {
				local: {
					sessionPlayerId,
					escrow: {
						tokens: {
							bk: 0,
							wh: 0,
							re: 0,
							bl: 0,
							gr: 0,
							go: 0
						}
					}
				},
				game: {
					currentPlayerIndex: 0,
					players: {},
					tokens: {
						bk: 0,
						wh: 0,
						re: 0,
						bl: 0,
						gr: 0,
						go: 0
					}
				}
			},
			states: {
				initializing: {
					on: {
						SETUP: {
							target: 'waitingToPublish',
							actions: ['setup']
						},
						READ: {
							target: 'determiningNextPlayerTurn',
							actions: ['read']
						}
					}
				},
				waitingToPublish: {
					on: {
						PUBLISH: {
							target: 'determiningNextPlayerTurn',
							actions: ['publish']
						}
					}
				},
				determiningNextPlayerTurn: {
					always: [
						{ target: 'takingTurn', cond: 'isSessionPlayerTurn' },
						{ target: 'waitingTurn', cond: 'notSessionPlayerTurn' }
					]
				},
				takingTurn: {
					on: {
						END_TURN: {
							target: 'waitingToPublish',
							actions: ['endTurn']
						},
						TAKE_TOKEN: {
							target: 'takingTurn',
							actions: ['takeToken'],
							cond: 'canTakeToken'
						}
					}
				},
				waitingTurn: {
					on: {
						READ: {
							target: 'determiningNextPlayerTurn',
							actions: ['read']
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
