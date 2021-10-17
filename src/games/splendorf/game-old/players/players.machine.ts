import type { Game, Color, Players, Users, Card } from '../types';
import type { StateMachine } from 'xstate/lib/types';
import type { GameCtx, GameEvt } from '../game.machine';
import { createMachine, sendUpdate, assign } from 'xstate';
import { reduce, cloneDeep } from 'lodash';
import { createPlayer } from '.';

export interface PlayersCtx {
	sessionPlayerId: string;
	prev: Players;
	players: Players;
}

export type PlayersEvt =
	| { type: 'SETUP'; users: Users; sessionPlayerId: string }
	| { type: 'UPDATE'; game: Game; sessionPlayerId: string }
	| { type: 'GAME.RESET_TURN' }
	| { type: 'TOKENS.SELECT'; color: Color }
	| { type: 'CARDS.BUY'; card: Card };

export const playersMachine: StateMachine<PlayersCtx, any, PlayersEvt> = createMachine({
	id: 'players',
	context: {
		sessionPlayerId: null,
		prev: {},
		players: {}
	},
	initial: 'waiting',
	states: {
		waiting: {
			on: {
				SETUP: {
					target: 'updatingGame',
					actions: [
						assign({
							sessionPlayerId: (_, evt) => evt.sessionPlayerId,
							prev: (_, evt) => cloneDeep(setup(evt.users)),
							players: (_, evt) => cloneDeep(setup(evt.users))
						}),
						(ctx, evt) => {
							console.log('players SETUP', evt);
						}
					]
				},
				UPDATE: {
					target: 'updatingGame',
					actions: assign({
						sessionPlayerId: (_, evt) => evt.sessionPlayerId,
						prev: (_, evt) => cloneDeep(evt.game.players),
						players: (_, evt) => cloneDeep(evt.game.players)
					})
				},
				'GAME.RESET_TURN': {
					target: 'updatingGame',
					actions: assign({
						players: (ctx) => ctx.prev
					})
				},
				'CARDS.BUY': {
					target: 'updatingGame',
					actions: assign({
						players: buyCard
					})
				},
				'TOKENS.SELECT': {
					target: 'updatingGame',
					actions: assign({
						players: selectToken
					})
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

function setup(users: Users): Players {
	return reduce(
		users,
		function (result, user, index) {
			const players = {
				...result,
				[user.id]: createPlayer({ index, id: user.id, name: user.alias })
			};
			return players;
		},
		{}
	);
}

function buyCard(ctx: PlayersCtx, evt: PlayersEvt): Players {
	if (evt.type !== 'CARDS.BUY') return;

	return {
		...ctx.players,
		[ctx.sessionPlayerId]: {
			...ctx.players[ctx.sessionPlayerId],
			cards: {
				...ctx.players[ctx.sessionPlayerId].cards,
				[evt.card.clr]: [...ctx.players[ctx.sessionPlayerId].cards[evt.card.clr], evt.card]
			}
		}
	};
}

function selectToken(ctx, evt): Players {
	return {
		...ctx.players,
		[ctx.sessionPlayerId]: {
			...ctx.players[ctx.sessionPlayerId],
			tokens: {
				...ctx.players[ctx.sessionPlayerId].tokens,
				[evt.color]: ctx.players[ctx.sessionPlayerId].tokens[evt.color] + 1
			}
		}
	};
}
