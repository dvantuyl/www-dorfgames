import { assign } from 'xstate';
import reduce from 'lodash/reduce.js';
import shuffle from 'lodash/shuffle.js';
import type { GameState, GameEvent, Players, Tokens, GameCtx, Users } from '../../types';

export const actions = {
	setup: assign({
		game: (_, event: GameEvent) => {
			if (event.type !== 'SETUP') return;
			return setupGame(event.users);
		}
	}),
	read: assign({
		game: (_, event: GameEvent) => {
			if (event.type !== 'READ') return;
			return event.game;
		}
	}),
	publish: (context: GameCtx, event: GameEvent): void => {
		if (event.type !== 'PUBLISH') return;
		event.callback(context.game);
	}
};

export function setupGame(users: Users): GameState {
	return {
		currentPlayerIndex: 0,
		players: setupPlayers(users),
		tokens: setupTokens(users.length)
	};
}

function setupPlayers(users: Users): Players {
	let index = 0;
	return reduce(
		shuffle(users),
		function (result, user, id) {
			const players = {
				...result,
				[id]: {
					index,
					id,
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
			index++;
			return players;
		},
		[]
	);
}

function setupTokens(numPlayers): Tokens {
	return {
		bk: numTokens(numPlayers),
		wh: numTokens(numPlayers),
		re: numTokens(numPlayers),
		gr: numTokens(numPlayers),
		bl: numTokens(numPlayers),
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
