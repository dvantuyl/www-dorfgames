import { players, tokens } from './stores';

export type State = {
	i: number;
	players: Players;
	tokens: Tokens;
};
export type Players = {
	currentPlayerIndex: number;
	list: Player[];
};
export type Tokens = { [K in ColorType]: number };

export type Player = {
	id: string;
	name: string;
	tokens: { [K in ColorType]: number };
};

enum ColorEnum {
	bk,
	wh,
	re,
	gr,
	bl,
	go
}

export type ColorType = keyof typeof ColorEnum;
export const colors = <ColorType[]>Object.values(ColorEnum).filter((e) => typeof e === 'string');

export const Color = colors.reduce((acc: { [K in ColorType]?: ColorType }, clr: ColorType) => {
	acc[clr] = clr as ColorType;
	return acc;
}, {}) as { [K in ColorType]: ColorType };

export type SetupStateParams = {
	state: State;
	users: string[];
};

export function setupState(users: { uuid: string; alias: string }[]): State {
	return {
		i: 2,
		players: setupPlayers(users),
		tokens: setupTokens(users.length)
	};
}

export function readState(state: State): void {
	players.set(state.players);
	tokens.set(state.tokens);
}

export function nextPlayerIndex(currentPlayerIndex: number, numPlayers: number): number {
	return currentPlayerIndex === numPlayers - 1 ? 0 : currentPlayerIndex + 1;
}

export function writeState(
	playerIndex: number,
	playerList: Player[],
	tokens: Tokens,
	state: State
): State {
	const players = {
		currentPlayerIndex: playerIndex,
		list: playerList
	};

	return {
		i: state.i + 1,
		players,
		tokens
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

	const state = { currentPlayerIndex, list };
	players.set(state);
	return state;
}

function setupTokens(numPlayers): Tokens {
	const state = {
		bk: numTokens(numPlayers),
		wh: numTokens(numPlayers),
		re: numTokens(numPlayers),
		gr: numTokens(numPlayers),
		bl: numTokens(numPlayers),
		go: numTokens(numPlayers)
	};

	tokens.set(state);
	return state;
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
