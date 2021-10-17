import type { Player } from '../types';
import { createPlayerCards } from './playerCards.model';
import { createTokens } from './tokens.model';

const player = {
	id: null,
	index: 0,
	name: null,
	tokens: createTokens(),
	cards: createPlayerCards(),
	ext: {},
	score: 0
};

export function createPlayer(params: Partial<Player> = {}): Player {
	return { ...player, ...params };
}
