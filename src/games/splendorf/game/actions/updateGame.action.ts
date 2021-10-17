import type { GameEvt } from '../types';
import { assign } from 'xstate';

export const updateGame = assign({
	currentPlayerIndex: (_, evt: GameEvt) => {
		if (evt.type !== 'UPDATE') return;
		return evt.game.currentPlayerIndex;
	},
	players: (_, evt) => {
		if (evt.type !== 'UPDATE') return;
		return evt.game.players;
	},
	tokens: (_, evt) => {
		if (evt.type !== 'UPDATE') return;
		return evt.game.tokens;
	}
});
