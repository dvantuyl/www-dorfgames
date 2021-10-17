import type { ActorRefWithDeprecatedState, StateMachine } from 'xstate';
import type { Tokens, Users, Game, Color, Card } from './types';
import type { PlayersCtx, PlayersEvt } from './players/players.machine';
import type { TokensCtx, TokensEvt } from './tokens';
import type { CardsCtx, CardsEvt } from './cards';
import type { CardViewerCtx, CardViewerEvt } from './cardViewer';
import { createMachine, spawn, forwardTo, send, assign } from 'xstate';
import { guards } from './game.guards';
import { actions } from './game.actions';
import { tokensMachine, createTokens } from './tokens';
import { playersMachine } from './players';
import { cardsMachine } from './cards';
import { cardViewerMachine } from './cardViewer';

export interface GameCtx {
	sessionPlayerId: string;
	currentPlayerIndex: number;
	turn: { tokens: Tokens };
	playersRef: ActorRefWithDeprecatedState<
		PlayersCtx,
		PlayersEvt,
		{
			value: any;
			context: PlayersCtx;
		}
	>;
	tokensRef: ActorRefWithDeprecatedState<
		TokensCtx,
		TokensEvt,
		{
			value: any;
			context: TokensCtx;
		}
	>;
	cardsRef: ActorRefWithDeprecatedState<
		CardsCtx,
		CardsEvt,
		{
			value: any;
			context: CardsCtx;
		}
	>;
	cardViewerRef: ActorRefWithDeprecatedState<
		CardViewerCtx,
		CardViewerEvt,
		{
			value: any;
			context: CardViewerCtx;
		}
	>;
}

export type GameEvt =
	| { type: 'SETUP'; users: Users }
	| { type: 'UPDATE'; game: Game }
	| { type: 'TOKENS.SELECT'; color: Color }
	| { type: 'CARDS.BUY'; card: Card; index: number }
	| { type: 'GAME.PUBLISH'; callback: (game: Game) => void }
	| { type: 'GAME.END_TURN'; callback: (game: Game) => void }
	| { type: 'GAME.RESET_TURN' };

export function createGameMachine(sessionPlayerId: string): StateMachine<GameCtx, any, GameEvt> {
	return createMachine<GameCtx, GameEvt>(
		{
			id: 'gameMachine',
			initial: 'initializing',
			context: {
				sessionPlayerId,
				currentPlayerIndex: 0,
				turn: { tokens: createTokens() },
				playersRef: null,
				tokensRef: null,
				cardsRef: null,
				cardViewerRef: null
			},
			states: {
				initializing: {
					entry: assign({
						playersRef: () => spawn(playersMachine, 'players'),
						tokensRef: () => spawn(tokensMachine, 'tokens'),
						cardsRef: () => spawn(cardsMachine, 'cards'),
						cardViewerRef: () => spawn(cardViewerMachine, 'cardViewer')
					}),
					on: {
						SETUP: {
							target: 'waitingToPublish',
							actions: [
								send((ctx, evt) => ({ ...evt, sessionPlayerId: ctx.sessionPlayerId }), {
									to: 'players'
								}),
								forwardTo('cards'),
								forwardTo('tokens')
							]
						},
						UPDATE: {
							target: 'waitingTurn',
							actions: [
								'updatePlayerTurn',
								send((ctx, evt) => ({ ...evt, sessionPlayerId: ctx.sessionPlayerId }), {
									to: 'players'
								}),
								forwardTo('cards'),
								forwardTo('tokens')
							]
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
							actions: [
								'updatePlayerTurn',
								forwardTo('players'),
								forwardTo('cards'),
								forwardTo('tokens')
							]
						}
					}
				},
				takingTurn: {
					on: {
						'TOKENS.SELECT': {
							cond: 'canSelectToken',
							actions: send((_, evt) => ({ ...evt })),
							target: 'selectingTokens'
						},
						'CARDS.BUY': {
							// cond: 'canBuyCard',
							actions: [
								forwardTo('players'),
								forwardTo('cards'),
								forwardTo('tokens'),
								send({ type: 'CARD_VIEWER.CLOSE' }, { to: 'cardViewer' })
							],
							target: 'buyingCard'
						}
					}
				},
				selectingTokens: {
					on: {
						'TOKENS.SELECT': {
							cond: 'canSelectToken',
							actions: ['selectTurnTokens', forwardTo('tokens'), forwardTo('players')]
						},
						'GAME.RESET_TURN': {
							target: 'takingTurn',
							actions: ['resetTurn', forwardTo('players'), forwardTo('cards'), forwardTo('tokens')]
						},
						'GAME.END_TURN': {
							target: 'waitingToPublish',
							actions: ['endTurn']
						}
					}
				},
				buyingCard: {
					on: {
						'GAME.RESET_TURN': {
							target: 'takingTurn',
							actions: ['resetTurn', forwardTo('players'), forwardTo('cards'), forwardTo('tokens')]
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
