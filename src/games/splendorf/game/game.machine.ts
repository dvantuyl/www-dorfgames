import type { StateMachine } from 'xstate';
import type { Tokens, Users, Game, Players, Color, Card, Turn } from './types';
import { createMachine } from 'xstate';
import { createTokens } from './models';
import * as actions from './actions';
import * as guards from './guards';
import { turnStates } from './turn.states';
export interface GameCtx {
	sessionPlayerId: string;
	currentPlayerIndex: number;
	tokens: { bk: number; re: number; wh: number; gr: number; bl: number; go: 0 };
	players: Players;
	turn: Turn;
}

export type GameEvt =
	| { type: 'SETUP'; users: Users }
	| { type: 'UPDATE'; game: Game }
	| { type: 'PUBLISH'; callback: (game: Game) => void }
	| { type: 'SELECT_TOKEN'; color: any }
	| { type: 'BUY_CARD'; card: Card; index: number }
	| { type: 'HOLD_CARD'; card: Card; index: number }
	| { type: 'RESET_TURN' };

export function createGameMachine(sessionPlayerId: string): StateMachine<GameCtx, any, GameEvt> {
	return createMachine<GameCtx, GameEvt>(
		{
			id: 'game',
			initial: 'initializing',
			context: {
				sessionPlayerId,
				currentPlayerIndex: 0,
				tokens: { bk: 0, re: 0, wh: 0, gr: 0, bl: 0, go: 0 },
				players: {},
				turn: { selectedTokens: { bk: 0, re: 0, wh: 0, gr: 0, bl: 0, go: 0 } }
			},
			states: {
				initializing: {
					on: {
						SETUP: {
							target: 'waitingToPublish',
							actions: 'setupGame'
						},
						UPDATE: {
							target: 'waitingTurn',
							actions: 'updateGame'
						}
					}
				},
				waitingToPublish: {
					on: {
						PUBLISH: {
							target: 'waitingTurn',
							actions: 'publishGame'
						}
					}
				},
				waitingTurn: {
					always: [{ target: 'takingTurn', cond: 'isSessionPlayerTurn' }],
					on: {
						UPDATE: {
							target: 'waitingTurn',
							actions: 'updateGame'
						}
					}
				},
				takingTurn: {
					...turnStates,
					onDone: 'waitingToPublish'
				}
			}
		},
		{
			actions,
			guards
		}
	);
}
