import { createMachine, sendUpdate } from 'xstate';
import { assign, log } from 'xstate/lib/actions.js';
import reduce from 'lodash/reduce.js';
import type { Players, PlayersEvt, Users, PlayersCtx } from '../types';
import type { StateMachine } from 'xstate/lib/types';
import { createPlayer } from '.';

export const playersMachine: StateMachine<PlayersCtx, any, PlayersEvt> = createMachine({
	id: 'players',
	context: {
		prev: {},
		players: {}
	},
	initial: 'waiting',
	states: {
		waiting: {
			on: {
				SETUP: {
					target: 'updatingGame',
					actions: assign({
						prev: (_, evt) => setup(evt.users),
						players: (_, evt) => setup(evt.users)
					})
				},
				UPDATE: {
					target: 'updatingGame',
					actions: assign({
						prev: (_, evt) => evt.game.players,
						players: (_, evt) => evt.game.players
					})
				},
				'GAME.RESET_TURN': {
					target: 'updatingGame',
					actions: assign({
						players: (ctx) => ctx.prev
					})
				},
				'TOKENS.SELECT': {
					target: 'updatingGame',
					actions: assign({
						players: tokensTake
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

function tokensTake(ctx, evt): Players {
	return {
		...ctx.players,
		[evt.sessionPlayerId]: {
			...ctx.players[evt.sessionPlayerId],
			tokens: {
				...ctx.players[evt.sessionPlayerId].tokens,
				[evt.color]: ctx.players[evt.sessionPlayerId].tokens[evt.color] + 1
			}
		}
	};
}
