import { browser } from '$app/env';
import GUN from 'gun';
// import 'gun/sea.js';
import { v4 as uuidv4 } from 'uuid';
import { writable } from 'svelte/store';
import { variables } from '$lib/variables';

export type User = {
	uuid: string | null;
	alias: string | null;
	createdAt: number | null;
};

// Database
const peers = variables.gunServer ? [`${variables.gunServer}`] : ['http://localhost:8765/gun'];

export const db = GUN({ peers });

function createSessionStore(ref) {
	const { subscribe, set, update } = writable({
		uuid: null,
		alias: null,
		createdAt: null
	} as User);

	if (ref) {
		ref.on(function (data) {
			set({
				uuid: data.uuid,
				alias: data.alias,
				createdAt: data.createdAt
			});
		});
	}

	function setAlias(alias: string) {
		update((user) => {
			const updatedUser = { ...user, alias };
			db.get(`users/${user.uuid}`).put(updatedUser);
			return updatedUser;
		});
	}

	function signout() {
		const key = 'userId';
		localStorage.setItem(key, null);

		set({
			uuid: null,
			alias: null,
			createdAt: null
		});
	}

	return {
		subscribe,
		setAlias,
		signout
	};
}

function getDbUser() {
	if (browser) {
		const key = 'userId';
		let uuid = JSON.parse(localStorage.getItem(key));
		if (uuid) {
			return db.get(`users/${uuid}`);
		} else {
			uuid = uuidv4();
			localStorage.setItem(key, JSON.stringify(uuid));
			const createdAt = Date.now();
			return db.get(`users/${uuid}`).put({ uuid, createdAt });
		}
	}
}

export const user = createSessionStore(getDbUser());
