import type { GameCtx, GameEvt } from '../types';
import { pick } from 'lodash';

export function publishGame(ctx: GameCtx, evt: GameEvt): void {
	if (evt.type !== 'PUBLISH') return;
	evt.callback(pick(ctx, ['currentPlayerIndex', 'players', 'tokens']));
}
