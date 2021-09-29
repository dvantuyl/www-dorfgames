import { writable } from 'svelte/store';
import type { Tokens, ColorType } from '../index';

function createTokens() {
	const { subscribe, set, update } = writable({});

	function increment(clr: ColorType) {
		update((tokens: Tokens): Tokens => {
			tokens[clr] = tokens[clr] + 1;
			return tokens;
		});
	}

	function decrement(clr: ColorType) {
		update((tokens: Tokens): Tokens => {
			tokens[clr] = tokens[clr] - 1;
			return tokens;
		});
	}

	return {
		set,
		subscribe,
		increment,
		decrement,
		update
	};
}

export const tokens = createTokens();
