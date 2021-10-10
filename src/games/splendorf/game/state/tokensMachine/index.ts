import { createMachine, sendUpdate } from 'xstate';
import type { StateMachine } from 'xstate';
import type { ColorType, GameState, TokensState, TokensEvent, Users, TokensCtx } from '../../types';
import { assign, log } from 'xstate/lib/actions';

export const tokensMachine: StateMachine<TokensCtx, any, TokensEvent> = createMachine({
	id: 'tokensMachine',
	context: {
		tokens: {
			bk: 0,
			wh: 0,
			re: 0,
			bl: 0,
			gr: 0,
			go: 0
		}
	},
	initial: 'waiting',
	states: {
		waiting: {
			entry: [log('tokens waiting')],
			on: {
				SETUP: {
					target: 'updatingGame',
					actions: assign({
						tokens: (_, event) => setup(event.users)
					})
				},
				UPDATE: {
					target: 'updatingGame',
					actions: assign({
						tokens: (_, event) => event.game.tokens
					})
				},
				'TOKENS.TAKE': {
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
	return {
		bk: numTokens(numPlayers),
		wh: numTokens(numPlayers),
		re: numTokens(numPlayers),
		bl: numTokens(numPlayers),
		gr: numTokens(numPlayers),
		go: numTokens(numPlayers)
	};
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
