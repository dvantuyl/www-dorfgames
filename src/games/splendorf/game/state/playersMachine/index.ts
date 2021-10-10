import { createMachine, sendUpdate } from 'xstate';
import { assign, log } from 'xstate/lib/actions';
import type { StateMachine } from 'xstate';
import type { PlayersState, PlayersEvent, Users, PlayersCtx } from '../../types';
import reduce from 'lodash/reduce.js';
import shuffle from 'lodash/shuffle.js';
import { tokensInit } from '../..';

export const playersMachine: StateMachine<PlayersCtx, any, PlayersEvent> = createMachine({
	id: 'players',
	context: {
		players: {}
	},
	initial: 'waiting',
	states: {
		waiting: {
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
					tokens: tokensInit()
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
