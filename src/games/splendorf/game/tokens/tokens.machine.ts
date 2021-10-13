import type { StateMachine } from 'xstate/lib/types';
import type { Game, Color, Tokens, Users } from '../types';
import { createMachine, sendUpdate } from 'xstate';
import { assign, log } from 'xstate/lib/actions.js';
import { createTokens } from './tokens.model';

export interface TokensCtx {
	prev: Tokens;
	tokens: Tokens;
}

export type TokensEvt =
	| { type: 'SETUP'; users: Users }
	| { type: 'UPDATE'; game: Game }
	| { type: 'GAME.RESET_TURN' }
	| { type: 'TOKENS.SELECT'; color: Color };

export const tokensMachine: StateMachine<TokensCtx, any, TokensEvt> = createMachine({
	id: 'tokensMachine',
	context: {
		prev: createTokens(),
		tokens: createTokens()
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

function setup(users: Users): Tokens {
	const numPlayers = Object.values(users).length;
	return createTokens(numTokens(numPlayers), { go: 5 });
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
