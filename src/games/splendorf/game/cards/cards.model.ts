import type { Color, Card, GameCards } from '../types';
import shuffle from 'lodash/shuffle.js';
import { Clr } from '../colors';

type cardTableRow = [number, Color, number, number, number, number, number, number, number];

const cardTable: Array<cardTableRow> = [
	[0, Clr.bk, 0, 0, 1, 1, 1, 1, 0],
	[0, Clr.bk, 0, 0, 0, 1, 0, 2, 0],
	[0, Clr.bk, 0, 0, 2, 0, 0, 2, 0],
	[0, Clr.bk, 0, 1, 0, 3, 0, 1, 0],
	[0, Clr.bk, 0, 0, 0, 0, 0, 3, 0],
	[0, Clr.bk, 0, 0, 1, 1, 2, 1, 0],
	[0, Clr.bk, 0, 0, 2, 1, 2, 0, 0],
	[0, Clr.bk, 1, 0, 0, 0, 4, 0, 0],
	[1, Clr.bk, 1, 0, 3, 0, 2, 2, 0],
	[1, Clr.bk, 1, 2, 3, 0, 0, 3, 0],
	[1, Clr.bk, 2, 0, 0, 2, 1, 4, 0],
	[1, Clr.bk, 2, 0, 5, 0, 0, 0, 0],
	[1, Clr.bk, 2, 0, 0, 3, 0, 5, 0],
	[1, Clr.bk, 3, 6, 0, 0, 0, 0, 0],
	[2, Clr.bk, 3, 0, 3, 3, 3, 5, 0],
	[2, Clr.bk, 4, 0, 0, 7, 0, 0, 0],
	[2, Clr.bk, 4, 3, 0, 6, 0, 3, 0],
	[2, Clr.bk, 5, 3, 0, 7, 0, 0, 0],

	[0, Clr.bl, 0, 2, 1, 0, 0, 0, 0],
	[0, Clr.bl, 0, 1, 1, 2, 0, 1, 0],
	[0, Clr.bl, 0, 1, 1, 1, 0, 1, 0],
	[0, Clr.bl, 0, 0, 0, 1, 1, 3, 0],
	[0, Clr.bl, 0, 3, 0, 0, 0, 0, 0],
	[0, Clr.bl, 0, 0, 1, 2, 0, 2, 0],
	[0, Clr.bl, 0, 2, 0, 0, 0, 2, 0],
	[0, Clr.bl, 1, 0, 0, 4, 0, 0, 0],
	[1, Clr.bl, 1, 0, 0, 3, 2, 2, 0],
	[1, Clr.bl, 1, 3, 0, 0, 2, 3, 0],
	[1, Clr.bl, 2, 0, 5, 0, 3, 0, 0],
	[1, Clr.bl, 2, 0, 0, 0, 5, 0, 0],
	[1, Clr.bl, 2, 4, 2, 1, 0, 0, 0],
	[1, Clr.bl, 3, 0, 0, 0, 6, 0, 0],
	[2, Clr.bl, 3, 5, 3, 3, 0, 3, 0],
	[2, Clr.bl, 4, 0, 7, 0, 0, 0, 0],
	[2, Clr.bl, 4, 3, 6, 0, 3, 0, 0],
	[2, Clr.bl, 5, 0, 7, 0, 3, 0, 0],

	[0, Clr.gr, 0, 0, 2, 0, 1, 0, 0],
	[0, Clr.gr, 0, 0, 0, 2, 2, 0, 0],
	[0, Clr.gr, 0, 0, 1, 0, 3, 1, 0],
	[0, Clr.gr, 0, 1, 1, 1, 1, 0, 0],
	[0, Clr.gr, 0, 2, 1, 1, 1, 0, 0],
	[0, Clr.gr, 0, 2, 0, 2, 1, 0, 0],
	[0, Clr.gr, 0, 0, 0, 3, 0, 0, 0],
	[0, Clr.gr, 1, 4, 0, 0, 0, 0, 0],
	[1, Clr.gr, 1, 0, 3, 3, 0, 2, 0],
	[1, Clr.gr, 1, 2, 2, 0, 3, 0, 0],
	[1, Clr.gr, 2, 1, 4, 0, 2, 0, 0],
	[1, Clr.gr, 2, 0, 0, 0, 0, 5, 0],
	[1, Clr.gr, 2, 0, 0, 0, 5, 3, 0],
	[1, Clr.gr, 3, 0, 0, 0, 0, 6, 0],
	[2, Clr.gr, 3, 3, 5, 3, 3, 0, 0],
	[2, Clr.gr, 4, 0, 3, 0, 6, 3, 0],
	[2, Clr.gr, 4, 0, 0, 0, 7, 0, 0],
	[2, Clr.gr, 5, 0, 0, 0, 7, 3, 0],

	[0, Clr.re, 0, 0, 3, 0, 0, 0, 0],
	[0, Clr.re, 0, 3, 1, 1, 0, 0, 0],
	[0, Clr.re, 0, 0, 0, 0, 2, 1, 0],
	[0, Clr.re, 0, 2, 2, 0, 0, 1, 0],
	[0, Clr.re, 0, 1, 2, 0, 1, 1, 0],
	[0, Clr.re, 0, 1, 1, 0, 1, 1, 0],
	[0, Clr.re, 0, 0, 2, 2, 0, 0, 0],
	[0, Clr.re, 1, 0, 4, 0, 0, 0, 0],
	[1, Clr.re, 1, 3, 0, 2, 3, 0, 0],
	[1, Clr.re, 1, 3, 2, 2, 0, 0, 0],
	[1, Clr.re, 2, 0, 1, 0, 4, 2, 0],
	[1, Clr.re, 2, 5, 3, 0, 0, 0, 0],
	[1, Clr.re, 2, 5, 0, 0, 0, 0, 0],
	[1, Clr.re, 3, 0, 0, 6, 0, 0, 0],
	[2, Clr.re, 3, 3, 3, 0, 5, 3, 0],
	[2, Clr.re, 4, 0, 0, 0, 0, 7, 0],
	[2, Clr.re, 4, 0, 0, 3, 3, 6, 0],
	[2, Clr.re, 5, 0, 0, 3, 0, 7, 0],

	[0, Clr.wh, 0, 1, 0, 0, 2, 2, 0],
	[0, Clr.wh, 0, 1, 0, 2, 0, 0, 0],
	[0, Clr.wh, 0, 1, 0, 1, 1, 1, 0],
	[0, Clr.wh, 0, 0, 0, 0, 3, 0, 0],
	[0, Clr.wh, 0, 0, 0, 0, 2, 2, 0],
	[0, Clr.wh, 0, 1, 0, 1, 1, 2, 0],
	[0, Clr.wh, 0, 1, 3, 0, 1, 0, 0],
	[0, Clr.wh, 1, 0, 0, 0, 0, 4, 0],
	[1, Clr.wh, 1, 2, 0, 2, 0, 3, 0],
	[1, Clr.wh, 1, 0, 2, 3, 3, 0, 0],
	[1, Clr.wh, 2, 2, 0, 4, 0, 1, 0],
	[1, Clr.wh, 2, 0, 0, 5, 0, 0, 0],
	[1, Clr.wh, 2, 3, 0, 5, 0, 0, 0],
	[1, Clr.wh, 3, 0, 6, 0, 0, 0, 0],
	[2, Clr.wh, 3, 3, 0, 5, 3, 3, 0],
	[2, Clr.wh, 4, 7, 0, 0, 0, 0, 0],
	[2, Clr.wh, 4, 6, 3, 3, 0, 0, 0],
	[2, Clr.wh, 5, 7, 3, 0, 0, 0, 0]
];

const createCard = (
	id: number,
	row: number,
	clr: Color,
	pts: number,
	bk: number,
	wh: number,
	re: number,
	bl: number,
	gr: number,
	go: number
): Card => ({
	id,
	row,
	clr,
	pts,
	cost: { bk, wh, re, bl, gr, go }
});

function createGameCards(): GameCards {
	const cards = shuffle(cardTable.map((c, i) => createCard(i, ...c))) as Array<Card>;
	const decks = [
		cards.filter((c: Card) => c.row === 0),
		cards.filter((c: Card) => c.row === 1),
		cards.filter((c: Card) => c.row === 2)
	];

	return [
		{
			index: 0,
			reveal: decks[0].splice(0, 4) as [Card, Card, Card, Card],
			deck: decks[0]
		},
		{
			index: 1,
			reveal: decks[1].splice(0, 4) as [Card, Card, Card, Card],
			deck: decks[1]
		},
		{
			index: 2,
			reveal: decks[2].splice(0, 4) as [Card, Card, Card, Card],
			deck: decks[2]
		}
	];
}

export const gameCards = createGameCards();
