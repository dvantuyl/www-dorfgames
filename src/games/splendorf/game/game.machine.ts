import type { StateMachine } from 'xstate';
import type { Tokens, Users, Game, Players, Card, Turn, Cards } from './types';
import { createMachine, send, assign, spawn } from 'xstate';
import { createTokens } from './models';
import * as actions from './actions';
import * as guards from './guards';
import { cardViewMachine } from './cardView.machine';
export interface GameCtx {
	sessionPlayerId: string;
	currentPlayerIndex: number;
	tokens: Tokens;
	players: Players;
	cards: Cards;
	turn: Turn;
	history: Game[];
	cardViewRef: any;
}

export type GameEvt =
	| { type: 'SETUP'; users: Users }
	| { type: 'UPDATE'; history: Game[] }
	| { type: 'PUBLISH'; callback: (history: Game[]) => void }
	| { type: 'CAN_SELECT_TOKEN'; color: any }
	| { type: 'SELECT_TOKEN'; color: any }
	| { type: 'BUY_CARD'; card: Card; index: number }
	| { type: 'HOLD_CARD'; card: Card; index: number }
	| { type: 'END_TURN' }
	| { type: 'RESET_TURN' };

export function createGameMachine(sessionPlayerId: string): StateMachine<GameCtx, any, GameEvt> {
	return createMachine<GameCtx, GameEvt>(
		{
			id: 'game',
			initial: 'initializing',
			context: {
				sessionPlayerId,
				currentPlayerIndex: 0,
				tokens: createTokens(),
				cards: null,
				players: {},
				turn: { selectedTokens: createTokens() },
				history: [],
				cardViewRef: null
			},
			states: {
				initializing: {
					entry: assign({
						cardViewRef: () => spawn(cardViewMachine, 'cardView')
					}),
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
					on: {
						SELECT_TOKEN: {
							cond: 'canSelectToken',
							actions: send((_, evt) => evt),
							target: 'selectingTokens'
						},
						BUY_CARD: {
							target: 'buyingCard',
							actions: 'buyCard'
						},
						END_TURN: {
							target: 'waitingToPublish',
							actions: 'endTurn'
						}
					}
				},
				selectingTokens: {
					on: {
						SELECT_TOKEN: {
							cond: 'canSelectToken',
							actions: 'selectToken'
						},
						RESET_TURN: {
							target: 'takingTurn',
							actions: 'resetTurn'
						},
						END_TURN: {
							target: 'waitingToPublish',
							actions: 'endTurn'
						}
					}
				},
				buyingCard: {
					on: {
						RESET_TURN: {
							target: 'takingTurn',
							actions: 'resetTurn'
						},
						END_TURN: {
							target: 'waitingToPublish',
							actions: 'endTurn'
						}
					}
				},
				holdingCard: {
					on: {
						RESET_TURN: {
							target: 'takingTurn',
							actions: 'resetTurn'
						},
						END_TURN: {
							target: 'waitingToPublish',
							actions: 'endTurn'
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
