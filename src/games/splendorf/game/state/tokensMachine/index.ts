import { createMachine, sendUpdate } from 'xstate';
import type { StateMachine } from 'xstate';
import type { TokensState, TokensEvent, Users, TokensCtx } from '../../types';
import { assign, log } from 'xstate/lib/actions';
import { tokensInit } from '../../index';

export const tokensMachine: StateMachine<TokensCtx, any, TokensEvent> = createMachine({
	id: 'tokensMachine',
	context: {
		prev: tokensInit(),
		tokens: tokensInit()
	},
	initial: 'waiting',
	states: {
		waiting: {
			on: {
				SETUP: {
					target: 'updatingGame',
					actions: assign({
						prev: (_, event) => setup(event.users),
						tokens: (_, event) => setup(event.users)
					})
				},
				UPDATE: {
					target: 'updatingGame',
					actions: assign({
						prev: (_, event) => event.game.tokens,
						tokens: (_, event) => event.game.tokens
					})
				},
				'GAME.RESET_TURN': {
					target: 'updatingGame',
					actions: assign({
						tokens: (ctx) => ctx.prev
					})
				},
				'TOKENS.SELECT': {
					target: 'updatingGame',
					actions: assign({
						tokens: (context, event) => ({
							...context.tokens,
							[event.color]: context.tokens[event.color] - 1
						})
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

function setup(users: Users): TokensState {
	const numPlayers = Object.values(users).length;
	return tokensInit(numTokens(numPlayers), { go: 5 });
}

function numTokens(numPlayers: number): number {
	switch (numPlayers) {
		case 3:
			return 5;
		case 2:
			return 4;
		default:
			return 7;
	}
}
