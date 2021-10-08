import type { Session } from '$lib/types';
import { writable } from 'svelte/store';
import { db } from './db';
import pick from 'lodash/pick.js';
import type { IGunChainReference } from 'gun/types/chain';
import { browser } from '$app/env';

function createSessionStore(ref: IGunChainReference<any, 'users', 'root'>) {
	const { subscribe, set, update } = writable({} as Session);
	let $userRef: IGunChainReference<any, 'users', 'root'>;

	if (userRef()) {
		userRef().once((data) => {
			const user = pick(data, ['alias', 'createdAt']);
			const loginAt = Date.now();
			userRef().put({ ...user, loginAt });
		});
		initUserRefSubscription();
	}

	function userRef() {
		if ($userRef) {
			return $userRef;
		} else if (localStorageUserId()) {
			$userRef = ref.get(localStorageUserId());
			return $userRef;
		} else {
			return null;
		}
	}

	function localStorageUserId() {
		if (browser) {
			const key = 'userId';
			return JSON.parse(localStorage.getItem(key));
		} else {
			return null;
		}
	}

	function register(alias: string): void {
		if (browser) {
			const key = 'userId';
			const loginAt = Date.now();
			$userRef = ref.set({ alias, createdAt: loginAt, loginAt });
			const id = $userRef._.get;
			localStorage.setItem(key, JSON.stringify(id));
			initUserRefSubscription();
		}
	}

	function initUserRefSubscription() {
		userRef().on(function (data, id) {
			const user = { ...pick(data, ['alias', 'createdAt', 'loginAt']), id };
			update((session) => {
				return { ...session, user };
			});
		});
	}

	function setAlias(alias: string) {
		if (userRef()) {
			update((session) => {
				const user = { ...session.user, alias };
				userRef().put(pick(user, ['alias', 'createdAt', 'loginAt']));
				return { ...session, user };
			});
		}
	}

	function logout() {
		if (browser) {
			const key = 'userId';
			localStorage.setItem(key, null);
			set({});
		}
	}

	return {
		setAlias,
		subscribe,
		register,
		userRef,
		logout
	};
}

const ref = db.get('users');
export const session = createSessionStore(ref);
