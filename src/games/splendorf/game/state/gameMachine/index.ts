import { createMachine } from 'xstate';
import type { GameEvent, GameCtx } from '../../types';
import { actions } from './actions';
import { guards } from './guards';

export const gameMachine = createMachine<GameCtx, GameEvent>(
	{
		id: 'gameMachine',
		initial: 'initializing',
		context: {
			local: {
				sessionPlayerId: null
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
					{ target: 'waitingTurn', cond: 'notPlayerTurn' }
				]
			},
			takingTurn: {
				on: {
					END_TURN: {
						target: 'waitingToPublish',
						actions: ['endTurn']
					}
				}
			},
			waitingTurn: {
				on: {
					READ: {
						target: 'choosingNextPlayer',
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
