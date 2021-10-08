import type { User } from '$lib/types';
export * from '$lib/types';

export interface GameCtx {
	game: GameState;
}

export interface GameState {
	players: Players;
	tokens: Tokens;
}

export type GameEvent =
	| { type: 'SETUP'; users: User[] }
	| { type: 'READ'; game: GameState }
	| { type: 'PUBLISH'; callback: (game: GameState) => void };

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
