import type { Tokens, Players, Turn, Cards } from '../types';
import type { GameCtx, GameEvt } from '../types';
import { assign } from 'xstate';
import { cloneDeep } from 'lodash';
import { createTokens } from '../models';

export const resetTurn = assign<GameCtx, GameEvt>({
	tokens,
	players,
	cards,
	turn
});

function tokens(ctx: GameCtx): Tokens {
	return cloneDeep(ctx.history[0].tokens);
}

function players(ctx: GameCtx): Players {
	return cloneDeep(ctx.history[0].players);
}

function cards(ctx: GameCtx): Cards {
	return cloneDeep(ctx.history[0].cards);
}

function turn(): Turn {
	return cloneDeep({ selectedTokens: createTokens() });
}
