import type { ColorType } from './types';

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
