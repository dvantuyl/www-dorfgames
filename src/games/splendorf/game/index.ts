import type { ColorType, TokensState } from './types';

enum ColorEnum {
	bk,
	wh,
	re,
	gr,
	bl,
	go
}

export * from './state';
export const colors = <ColorType[]>Object.values(ColorEnum).filter((e) => typeof e === 'string');

export const Color = colors.reduce((acc: { [K in ColorType]?: ColorType }, clr: ColorType) => {
	acc[clr] = clr as ColorType;
	return acc;
}, {}) as { [K in ColorType]: ColorType };

export function tokensInit(num = 0, colors: { [K in ColorType]?: number } = {}): TokensState {
	return {
		bk: num,
		wh: num,
		re: num,
		bl: num,
		gr: num,
		go: num,
		...colors
	};
}
