import type { GameCtx, GameEvt, Player } from '../types';
import sum from 'lodash/sum.js';
import reduce from 'lodash/reduce.js';
import { sessionPlayer } from '../util';
import { Clr } from '../models';

export function canSelectToken(ctx: GameCtx, evt: GameEvt): boolean {
	return (
		tokensAvailable(ctx, evt) &&
		tokenIsntGold(evt) &&
		// - A player can never have more than 10 tokens at the end of
		//   their turn (including jokers).
		playerTokensLessThan10(ctx) &&
		// - Take 3 gem tokens of different colors.
		((selectingDifferentColorToken(ctx, evt) &&
			differentColorsSelected(ctx) &&
			lessThan3TokensSelected(ctx)) ||
			// - Take 2 gem tokens of the same color.
			// - This action is only possible if there are at least 4 tokens of the
			//   chosen color left when the player takes them
			(lessThan2TokensSelected(ctx) && atLeast4TokensAvailable(ctx, evt)))
	);
}

function tokensAvailable(ctx: GameCtx, evt: GameEvt): boolean {
	if (evt.type !== 'SELECT_TOKEN') return;
	return ctx.tokens[evt.color] > 0;
}

function tokenIsntGold(evt: GameEvt): boolean {
	if (evt.type !== 'SELECT_TOKEN') return;
	return evt.color !== Clr.go;
}

function playerTokensLessThan10(ctx: GameCtx): boolean {
	const tokens = sessionPlayer(ctx)?.tokens || {};
	return sum(Object.values(tokens)) < 10;
}

function selectingDifferentColorToken(ctx: GameCtx, evt: GameEvt): boolean {
	if (evt.type !== 'SELECT_TOKEN') return;
	const tokens = ctx.turn.selectedTokens;
	return tokens[evt.color] === 0;
}

function differentColorsSelected(ctx: GameCtx): boolean {
	const tokens = ctx.turn.selectedTokens;
	return reduce(
		tokens,
		function (result: boolean, value: number) {
			return result && value < 2;
		},
		true
	);
}

function lessThan3TokensSelected(ctx: GameCtx): boolean {
	const tokens = ctx.turn.selectedTokens;
	return sum(Object.values(tokens)) < 3;
}

function atLeast4TokensAvailable(ctx: GameCtx, evt: GameEvt): boolean {
	if (evt.type !== 'SELECT_TOKEN') return;
	// we need to fudge the 'in a single turn' here by checking >= 3 instead of 4
	return ctx.tokens[evt.color] >= 3;
}

function lessThan2TokensSelected(ctx: GameCtx): boolean {
	const tokens = ctx.turn.selectedTokens;
	return sum(Object.values(tokens)) < 2;
}
