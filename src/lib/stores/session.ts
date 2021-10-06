import type { User } from '$lib/types';
import { browser } from '$app/env';
import { v4 as uuidv4 } from 'uuid';
import { writable } from 'svelte/store';
import { db } from './db';
import { pick } from 'lodash';

function createSessionStore(ref) {
	const { subscribe, set, update } = writable({ user: {} } as {
		user: User | Record<string, unknown>;
	});

	if (ref) {
		ref.on(function (data) {
			const user = pick(data, ['uuid', 'alias', 'createdAt', 'loginAt']);
			update((session) => {
				return { ...session, user };
			});
		});
	}

	function setAlias(alias: string) {
		update((session) => {
			const user = { ...session.user, alias };
			ref.put(user);
			return { ...session, user };
		});
	}

	function signout() {
		const key = 'userId';
		localStorage.setItem(key, null);

		set({ user: {} });
	}

	return {
		user: {
			setAlias
		},
		subscribe,
		signout
	};
}

function getDbUser() {
	if (browser) {
		const key = 'userId';
		let uuid = JSON.parse(localStorage.getItem(key));
		const loginAt = Date.now();
		if (uuid) {
			const ref = db.get('users').get(uuid);
			ref.once((data) => {
				const user = pick(data, ['uuid', 'alias', 'createdAt', 'loginAt']);
				ref.put({ ...user, loginAt });
			});
			return ref;
		} else {
			uuid = uuidv4();
			localStorage.setItem(key, JSON.stringify(uuid));
			const ref = db.get('users').get(uuid);
			ref.put({ uuid, createdAt: loginAt, loginAt });
			return ref;
		}
	}
}

export const session = createSessionStore(getDbUser());
