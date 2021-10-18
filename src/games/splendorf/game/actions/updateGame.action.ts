import type { GameCtx, GameEvt } from '../types';
import { assign } from 'xstate';
import { cloneDeep } from 'lodash';

export const updateGame = assign((ctx: GameCtx, evt: GameEvt): GameCtx => {
	if (evt.type !== 'UPDATE') return;
	ctx.history = evt.history;
	ctx = { ...ctx, ...ctx.history[0] };

	return cloneDeep(ctx);
});
