import type { GameCtx, GameEvt } from './game.machine';
import type { Player } from './types';
import sum from 'lodash/sum.js';
import reduce from 'lodash/reduce.js';
import { Clr } from './colors';

export const guards = {
	canBuyCard: (ctx: GameCtx, evt): boolean => {
		return true;
	}
};
