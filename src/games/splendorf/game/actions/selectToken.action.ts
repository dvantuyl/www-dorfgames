import type { GameCtx, GameEvt, Tokens, Players, Turn } from '../types';
import { assign } from 'xstate';
import { cloneDeep } from 'lodash';
import { sessionPlayer } from '../util';

export const selectToken = assign({
	tokens,
	players,
	turn
});

function tokens(ctx: GameCtx, evt: GameEvt): Tokens {
	if (evt.type !== 'SELECT_TOKEN') return;
	console.log('update tokens', evt.color);
	return cloneDeep({ ...ctx.tokens, [evt.color]: ctx.tokens[evt.color] - 1 });
}

function players(ctx: GameCtx, evt: GameEvt): Players {
	if (evt.type !== 'SELECT_TOKEN') return;
	console.log('update players', evt.color);
	const player = sessionPlayer(ctx);
	player.tokens[evt.color] = player.tokens[evt.color] + 1;

	return cloneDeep({ ...ctx.players, [player.id]: player });
}

function turn(ctx: GameCtx, evt: GameEvt): Turn {
	if (evt.type !== 'SELECT_TOKEN') return;
	console.log('update turn', evt.color);
	const t = ctx.turn.selectedTokens;
	t[evt.color] = t[evt.color] + 1;
	return cloneDeep({ ...ctx.turn, selectedTokens: t });
}
