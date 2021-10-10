export * from '$lib/types';

export type GameEvent =
	| { type: 'SETUP'; users: Users }
	| { type: 'UPDATE'; game: GameState }
	| { type: 'TOKENS.SELECT'; color: ColorType }
	| { type: 'GAME.PUBLISH'; callback: (game: GameState) => void }
	| { type: 'GAME.END_TURN'; callback: (game: GameState) => void };

export type TokensEvent =
	| { type: 'SETUP'; users: Users }
	| { type: 'UPDATE'; game: GameState }
	| { type: 'TOKENS.SELECT'; color: ColorType };

export type PlayersEvent =
	| { type: 'SETUP'; users: Users }
	| { type: 'UPDATE'; game: GameState }
	| { type: 'TOKENS.SELECT'; color: ColorType; sessionPlayerId: string };

export interface GameCtx {
	sessionPlayerId: string;
	currentPlayerIndex: number;
	turn: { tokens: TokensState };
	playersRef: StateMachine<PlayersState, any, PlayersEvent>;
	tokensRef: StateMachine<TokensState, any, TokensEvent>;
}

export interface PlayersCtx {
	players: PlayersState;
}
export interface TokensCtx {
	tokens: TokensState;
}
export interface GameState {
	currentPlayerIndex: number;
	players: PlayersState;
	tokens: TokensState;
}
export type PlayersState = Record<string, Player>;
export type TokensState = { [K in ColorType]: number };

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
