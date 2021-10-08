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

export type Users = Record<string, User>;

export type Session = {
	user?: User;
};

export type Room = {
	game: string;
	title: string;
	stateIndex: number;
	state: string;
};
