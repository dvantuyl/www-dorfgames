import { assign } from 'xstate';
import reduce from 'lodash/reduce.js';
import shuffle from 'lodash/shuffle.js';
import type {
	GameState,
	GameEvent,
	Players,
	Tokens,
	GameCtx,
	Users,
	LocalState
} from '../../types';

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
	takeToken: assign({
		game: takeToken,
		local: takeTokenEscrow
	}),
	endTurn: assign({
		game: setNextPlayerIndex,
		local: clearEscrow
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
	return reduce(
		shuffle(users),
		function (result, user, index) {
			console.log('setupPlayer', result, user, index);
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

function setNextPlayerIndex(context: GameCtx): GameState {
	const currentPlayerIndex = context.game.currentPlayerIndex;
	const numPlayers = Object.values(context.game.players).length;
	const nextPlayerIndex = currentPlayerIndex === numPlayers - 1 ? 0 : currentPlayerIndex + 1;
	return { ...context.game, currentPlayerIndex: nextPlayerIndex };
}

function clearEscrow(context: GameCtx): LocalState {
	return {
		...context.local,
		escrow: {
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
}

function takeToken(context: GameCtx, event: GameEvent): GameState {
	if (event.type !== 'TAKE_TOKEN') return;
	const sessionPlayerId = context.local.sessionPlayerId;
	const players = context.game.players;
	const tokens = context.game.tokens;
	players[sessionPlayerId].tokens[event.color]++;
	tokens[event.color]--;
	return { ...context.game, players, tokens };
}

function takeTokenEscrow(context: GameCtx, event: GameEvent): LocalState {
	if (event.type !== 'TAKE_TOKEN') return;
	const escrow = context.local.escrow;
	escrow.tokens[event.color]++;
	return { ...context.local, escrow };
}
