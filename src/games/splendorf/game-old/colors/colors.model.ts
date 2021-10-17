import type { Color, Colors } from '../types';

enum ColorEnum {
	bk,
	wh,
	re,
	gr,
	bl,
	go
}

export const colors = <Color[]>Object.values(ColorEnum).filter((e) => typeof e === 'string');

export const Clr = colors.reduce((acc: { [K in Color]?: Color }, clr: Color) => {
	acc[clr] = clr as Color;
	return acc;
}, {}) as { [K in Color]: Color };

export function createColors<T>(value: T, params: Partial<Colors<T>> = {}): Colors<T> {
	return { bk: value, wh: value, re: value, bl: value, gr: value, ...params };
}
