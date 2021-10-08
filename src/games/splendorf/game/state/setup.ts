import type { Players, GameState, Tokens } from '../types';

export function setupGame(users: { uuid: string; alias: string }[]): GameState {
	return {
		players: setupPlayers(users),
		tokens: setupTokens(users.length)
	};
}

function setupPlayers(users): Players {
	const currentPlayerIndex = 0;
	const list = users.map((user) => {
		return {
			id: user.uuid,
			name: user.alias,
			tokens: {
				bk: 0,
				wh: 0,
				re: 0,
				bl: 0,
				gr: 0,
				go: 0
			}
		};
	});

	return { currentPlayerIndex, list };
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
