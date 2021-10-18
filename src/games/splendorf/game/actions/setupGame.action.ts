import type { GameCtx, GameEvt, Tokens, Players, User, Game, Cards } from '../types';
import { assign } from 'xstate';
import { reduce, cloneDeep } from 'lodash';
import { createCards, createPlayer, createTokens } from '../models';

export const setupGame = assign((ctx: GameCtx, evt: GameEvt): GameCtx => {
	const game: Game = {
		currentPlayerIndex: 0,
		players: players(evt),
		tokens: tokens(evt),
		cards: cards()
	};
	ctx = { ...ctx, ...game };
	ctx.history = [game];
	return ctx;
});

function players(evt: GameEvt): Players {
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

function tokens(evt: GameEvt): Tokens {
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

function cards(): Cards {
	return createCards();
}
