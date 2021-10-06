import type { User } from '$lib/session/user';
import { db } from '$lib/session/user';
import type { IGunChainReference } from 'gun/types/chain';
import { writable } from 'svelte/store';
import _object from 'lodash/object.js';
import isEqual from 'lodash/isEqual.js';

export type Room = {
	game: string;
	title: string;
	stateIndex: number;
	state: string;
};

function createRoomsStore(ref: IGunChainReference<any, 'rooms', false>) {
	const { subscribe, set, update } = writable({} as Record<string, Room>);

	ref.map().on((data, key) => {
		if (data && data.title) {
			console.log('room', key, data);
			update((rooms) => ({ ...rooms, [key]: data }));
		} else {
			update((rooms) => {
				delete rooms[key];
				return rooms;
			});
		}
	});

	function joined(player: User, game: string, callback) {
		let $rooms: Record<string, Room> = {};

		db.get(`users/${player.uuid}`)
			.get('rooms')
			.map()
			.on((room, key) => {
				if (room && room.game === game) {
					const updatedRooms = { ...$rooms, [key]: room };
					if (!isEqual($rooms, updatedRooms)) {
						$rooms = updatedRooms;
						callback($rooms);
					}
				}
			});
	}

	function waiting(game: string, callback) {
		let $rooms: Record<string, Room> = {};

		ref.map().on((room, key) => {
			if (room && room.game === game && room.stateIndex === 0) {
				const updatedRooms = { ...$rooms, [key]: room };
				if (!isEqual($rooms, updatedRooms)) {
					$rooms = updatedRooms;
					callback($rooms);
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
						const updatedPlayers = { ...currentPlayers, [data.uuid]: data };
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

	function create(game: string, title: string): string {
		const roomRef = ref.set({
			game,
			title,
			stateIndex: 0,
			state: ''
		});
		return roomRef._.get;
	}

	return {
		waiting,
		joined,
		create,
		get,
		subscribe
	};
}

const ref = db.get('rooms');
export const rooms = createRoomsStore(ref);
