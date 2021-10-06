/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string;
}

export type User = {
	uuid: string;
	alias: string;
	createdAt: number;
	loginAt: number;
};
