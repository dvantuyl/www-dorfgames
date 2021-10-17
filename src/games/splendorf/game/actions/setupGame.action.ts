import type { GameCtx, GameEvt, Tokens, Players, User } from '../types';
import { assign } from 'xstate';
import { reduce } from 'lodash';
import { createPlayer, createTokens } from '../models';

export const setupGame = assign({
	players,
	tokens
});

function players(_: never, evt: GameEvt): Players {
	if (evt.type !== 'SETUP') return;
	return reduce(
		evt.users,
		function (result: Players, user: User, index: number) {
			const players = {
				...result,
				[user.id]: createPlayer({ index, id: user.id, name: user.alias })
			};
			return players;
		},
		{}
	);
}

function tokens(_: never, evt: GameEvt): Tokens {
	if (evt.type !== 'SETUP') return;
	const numPlayers = Object.values(evt.users).length;
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
