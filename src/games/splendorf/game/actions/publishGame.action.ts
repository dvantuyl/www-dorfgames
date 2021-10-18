import type { GameCtx, GameEvt } from '../types';
import { pick, cloneDeep } from 'lodash';

export function publishGame(ctx: GameCtx, evt: GameEvt): void {
	if (evt.type !== 'PUBLISH') return;
	const game = pick(ctx, ['currentPlayerIndex', 'players', 'tokens', 'cards']);
	ctx.history = [cloneDeep(game), ...ctx.history];
	evt.callback(ctx.history);
}
