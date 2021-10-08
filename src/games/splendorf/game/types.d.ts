export * from '$lib/types';

export interface GameCtx {
	game: GameState;
	local: LocalState;
}

export interface LocalState {
	sessionPlayerId: string;
	escrow: {
		tokens: Tokens;
	};
}

export interface GameState {
	currentPlayerIndex: number;
	players: Players;
	tokens: Tokens;
}

export type GameEvent =
	| { type: 'SETUP'; users: Users; sessionPlayerId: string }
	| { type: 'READ'; game: GameState; sessionPlayerId: string }
	| { type: 'PUBLISH'; callback: (game: GameState) => void }
	| { type: 'END_TURN'; callback: (game: GameState) => void }
	| { type: 'TAKE_TOKEN'; color: ColorType };

export type Players = Record<string, Player>;
export type Tokens = { [K in ColorType]: number };

export type Player = {
	index: number;
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
