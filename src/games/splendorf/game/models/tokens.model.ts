import { createColors } from './colors.model';
import type { Tokens } from '../types';

export function createTokens(num = 0, tokens: Partial<Tokens> = {}): Tokens {
	return createColors<number>(num, { go: num, ...tokens }) as Tokens;
}

//export const initialTokens = createTokens();
