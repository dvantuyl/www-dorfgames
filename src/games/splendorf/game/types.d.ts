import type { destroy_block } from 'svelte/internal';

export { Users } from '$lib/types';

export type GameEvt =
	| { type: 'SETUP'; users: Users }
	| { type: 'UPDATE'; game: Game }
	| { type: 'TOKENS.SELECT'; color: Color }
	| { type: 'CARDS.SELECT'; row: number; id: number }
	| { type: 'GAME.PUBLISH'; callback: (game: Game) => void }
	| { type: 'GAME.END_TURN'; callback: (game: Game) => void }
	| { type: 'GAME.RESET_TURN' };

export type TokensEvt =
	| { type: 'SETUP'; users: Users }
	| { type: 'UPDATE'; game: Game }
	| { type: 'GAME.RESET_TURN' }
	| { type: 'TOKENS.SELECT'; color: Color };

export type PlayersEvt =
	| { type: 'SETUP'; users: Users }
	| { type: 'UPDATE'; game: Game }
	| { type: 'GAME.RESET_TURN' }
	| { type: 'TOKENS.SELECT'; color: Color; sessionPlayerId: string };

export type CardsEvt =
	| { type: 'SETUP' }
	| { type: 'UPDATE'; game: Game }
	| { type: 'GAME.RESET_TURN' }
	| { type: 'CARDS.BUY'; row: number; id: number }
	| { type: 'CARDS.HOLD'; row: number; id: number };

export interface GameCtx {
	sessionPlayerId: string;
	currentPlayerIndex: number;
	turn: { tokens: TokensModel };
	playersRef: StateMachine<Players, any, PlayersEvt>;
	tokensRef: StateMachine<Tokens, any, TokensEvt>;
	cardsRef: StateMachine<Cards, any, CardsEvt>;
}

export interface PlayersCtx {
	prev: Players;
	players: Players;
}

export interface TokensCtx {
	prev: Tokens;
	tokens: Tokens;
}

export interface CardsCtx {
	prev: GameCards;
	cards: GameCards;
}

export interface NoblesCtx {
	prev: Nobles[];
	nobles: Nobles[];
}

export interface Game {
	currentPlayerIndex: number;
	players: Players;
	tokens: Tokens;
	cards: GameCards;
}

export type Players = Partial<{ string: Player }>;
export type Tokens = Colors<number>;
export type PlayerCards = Colors<Card[]> & { holds: Card[] };

export interface Card {
	id: number;
	row: number;
	clr: Color;
	pts: number;
	cost: Tokens;
}

export type GameCards = [Row, Row, Row];

export interface Player {
	id: string;
	index: number;
	name: string;
	tokens: Tokens;
	cards: PlayerCards;
	score: number;
	ext: { nobles?: Noble[] } & { cities?: City[] };
}

export interface Noble {
	id: number;
	pts: number;
	cost: Tokens;
}

export interface City {
	id: number;
	pts: number;
	kind: number;
	clr: Colors<number>;
}

export type Deck = Card[];
export interface Row {
	index: number;
	deck: Deck;
	reveal: [Card, Card, Card, Card];
}

enum ColorEnum {
	bk,
	wh,
	re,
	gr,
	bl,
	go
}

export type Color = keyof typeof ColorEnum;

export interface Colors<T> {
	[K in Color]: T;
}
