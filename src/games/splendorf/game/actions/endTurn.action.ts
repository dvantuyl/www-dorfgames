import type { GameCtx, Cards, Turn } from '../types';
import { assign } from 'xstate';
import { createTokens } from '../models';

export const endTurn = assign({
	currentPlayerIndex,
	turn,
	cards
});

// Set Next Player
function currentPlayerIndex(ctx: GameCtx): number {
	const currentPlayerIndex = ctx.currentPlayerIndex;
	const numPlayers = Object.values(ctx.players).length;
	return currentPlayerIndex === numPlayers - 1 ? 0 : currentPlayerIndex + 1;
}

// Clear selectedTokens accounting
function turn(): Turn {
	return { selectedTokens: createTokens() };
}

// Replenish bought cards from deck
function cards(ctx: GameCtx): Cards {
	const cards = ctx.cards;
	cards.forEach((cardRow, rowIndex) => {
		let updatedDeck = cardRow.deck;
		const reveal = cardRow.reveal;
		reveal.forEach((card, cardIndex) => {
			if (!card && updatedDeck.length) {
				const [topCard, ...deck] = updatedDeck;
				reveal[cardIndex] = topCard;
				updatedDeck = deck;
			}
		});
		cardRow.deck = updatedDeck;
		cardRow.reveal = [...reveal];
		cards[rowIndex] = cardRow;
	});

	return [...cards];
}
