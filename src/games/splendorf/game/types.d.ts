import type { destroy_block } from 'svelte/internal';

export { Users } from '$lib/types';

export type Game = {
	currentPlayerIndex: number;
	players: Players;
	tokens: Tokens;
	cards: Cards;
	// TODO ext: { nobles?: Noble[] } & { cities?: City[] };
};

export type Tokens = Colors<number>;

// PLAYERS
export type Players = Partial<{ string: Player }>;
export type Player = {
	id: string;
	index: number;
	name: string;
	tokens: Tokens;
	cards: PlayerCards;
	score: number;
	ext: { nobles?: Noble[] } & { cities?: City[] };
};
export type PlayerCards = Colors<Card[]> & { holds: Card[] };

// CARDS
export type Cards = [Row, Row, Row];
export type Row = {
	index: number;
	deck: Deck;
	reveal: [Card, Card, Card, Card];
};
export type Deck = Card[];
export type Card = {
	id: number;
	row: number;
	clr: Color;
	pts: number;
	cost: Tokens;
};

// COLORS
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

// EXT
export type Noble = {
	id: number;
	pts: number;
	cost: Tokens;
};
export type City = {
	id: number;
	pts: number;
	kind: number;
	clr: Colors<number>;
};
