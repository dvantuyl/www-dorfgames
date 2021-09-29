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

export function setupState(users: string[]): State {
	const players = setupPlayers(users);
	const tokens = setupTokens(users.length);
	return { i: 2, players, tokens };
}

export function updateState(state: State): void {
	players.set(state.players);
	tokens.set(state.tokens);
}

function setupPlayers(users): Players {
	const currentPlayerIndex = 0;
	const list = users.map((user) => {
		return {
			id: user,
			name: user,
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
