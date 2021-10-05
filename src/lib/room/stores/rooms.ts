import type { User } from '$lib/session/user';
import { db } from '$lib/session/user';
import type { IGunChainReference } from 'gun/types/chain';
import { writable } from 'svelte/store';
import _object from 'lodash/object.js';
import isEqual from 'lodash/isEqual.js';

export type Room = {
	game: string;
	stateIndex: number;
	title?: string;
	state?: '';
};

function createRoomsStore(ref: IGunChainReference<any, 'rooms', false>) {
	const { subscribe, set, update } = writable({} as Record<string, Room>);

	ref.map().on((data, key) => {
		if (data) {
			update((rooms) => ({ ...rooms, [key]: data }));
		} else {
			update((rooms) => {
				delete rooms[key];
				return rooms;
			});
		}
	});

	function withPlayer(player: User, game: string, callback) {
		let currentRooms: Record<string, Room> = {};

		db.get(`users/${player.uuid}`)
			.get('rooms')
			.map()
			.on((room, key) => {
				if (room && room.game === game) {
					const updatedRooms = { ...currentRooms, [key]: room };
					if (!isEqual(currentRooms, updatedRooms)) {
						currentRooms = updatedRooms;
						callback(currentRooms);
					}
				}
			});
	}

	const get = (key: string) => {
		const roomRef = ref.get(key);

		function addPlayer(player: User): void {
			const userRef = db.get(`users/${player.uuid}`);
			roomRef.get('players').set(userRef);
			userRef.get('rooms').set(roomRef);
		}

		function players(callback): void {
			let currentPlayers: Record<string, User> = {};
			roomRef
				.get('players')
				.map()
				.on((data) => {
					if (data && data.alias) {
						const player = _object.pick(data, ['uuid', 'alias']);
						const updatedPlayers = { ...currentPlayers, [player.uuid]: player };
						if (!isEqual(currentPlayers, updatedPlayers)) {
							currentPlayers = updatedPlayers;
							callback(Object.values(currentPlayers));
						}
					}
				});
		}

		function publishState(nextState: Record<string, unknown>): void {
			update((rooms) => {
				const stateIndex = rooms[key].stateIndex + 1;
				const state = JSON.stringify(nextState);
				roomRef.put({ state, stateIndex });
				return rooms;
			});
		}

		function subscribe(publish) {
			roomRef.on((data) => {
				if (data) {
					publish(data);
				}
			});
		}

		return {
			addPlayer,
			players,
			publishState,
			subscribe
		};
	};

	function create(game: string): string {
		const node = ref.set({
			game,
			stateIndex: 0,
			state: ''
		});
		return node._.get;
	}

	return {
		withPlayer,
		create,
		get,
		subscribe
	};
}

const ref = db.get('rooms');
export const rooms = createRoomsStore(ref);
