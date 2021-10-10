import { createMachine, sendUpdate } from 'xstate';
import { assign, log } from 'xstate/lib/actions';
import type { StateMachine } from 'xstate';
import type { PlayersState, PlayersEvent, Users, PlayersCtx } from '../../types';
import reduce from 'lodash/reduce.js';
import shuffle from 'lodash/shuffle.js';

export const playersMachine: StateMachine<PlayersCtx, any, PlayersEvent> = createMachine({
	id: 'players',
	context: {
		players: {}
	},
	initial: 'waiting',
	states: {
		waiting: {
			entry: (ctx, evt) => {
				console.log('players waiting', ctx, evt);
			},
			on: {
				SETUP: {
					target: 'updatingGame',
					actions: assign({
						players: (_, evt) => setup(evt.users)
					})
				},
				UPDATE: {
					target: 'updatingGame',
					actions: assign({
						players: (_, evt) => evt.game.players
					})
				},
				'TOKENS.TAKE': {
					target: 'updatingGame',
					actions: assign({
						players: tokensTake
					})
				}
			}
		},
		updatingGame: {
			entry: log('players updatingGame'),
			always: [
				{
					target: 'waiting',
					actions: sendUpdate()
				}
			]
		}
	}
});

function setup(users: Users): PlayersState {
	return reduce(
		shuffle(users),
		function (result, user, index) {
			const players = {
				...result,
				[user.id]: {
					index,
					id: user.id,
					name: user.alias,
					tokens: {
						bk: 0,
						wh: 0,
						re: 0,
						bl: 0,
						gr: 0,
						go: 0
					}
				}
			};
			return players;
		},
		{}
	);
}

function tokensTake(ctx, evt): PlayersState {
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
