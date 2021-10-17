import type { City } from '../types';

type cityTableRow = [number, number, number, number, number, number, number];

const cityTable: Array<cityTableRow> = [
	[11, 3, 3, 3, 3, 0, 0],
	[11, 3, 3, 3, 0, 3, 0],
	[12, 0, 0, 0, 0, 0, 6],
	[13, 3, 0, 4, 0, 0, 0],
	[13, 0, 0, 0, 3, 4, 0],
	[13, 0, 4, 3, 0, 0, 0],
	[13, 0, 3, 0, 4, 0, 0],
	[13, 4, 0, 0, 0, 3, 0],
	[13, 2, 2, 2, 2, 2, 0],
	[14, 2, 2, 2, 1, 1, 0],
	[14, 0, 0, 0, 0, 4, 4],
	[15, 0, 0, 0, 0, 0, 5],
	[16, 1, 1, 1, 1, 1, 0],
	[17, 0, 0, 0, 0, 0, 0]
];

const createCity = (
	id: number,
	pts: number,
	bk: number,
	wh: number,
	re: number,
	bl: number,
	gr: number,
	kind: number
): City => {
	return {
		id,
		pts,
		kind,
		clr: { bk, wh, re, bl, gr, go: 0 }
	};
};

export default cityTable.map((n, i) => createCity(i, ...n)) as Array<City>;
