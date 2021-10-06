import type { User } from '$lib/session/user';
import { db } from '$lib/session/user';
import type { IGunChainReference } from 'gun/types/chain';
import isEqual from 'lodash/isEqual.js';

export type Room = {
	game: string;
	title: string;
	stateIndex: number;
	state: string;
};

function createRoomsStore(ref: IGunChainReference<any, 'rooms', false>) {
	function joined(player: User, game: string, callback): IGunChainReference<any, 'rooms', false> {
		let $rooms: Record<string, Room> = {};

		return db
			.get(`users/${player.uuid}`)
			.get('rooms')
			.map()
			.on((room, key) => {
				// db.get(`users/${player.uuid}`).get('rooms').get(key).put(null); // DELETE ALL JOINED ROOMS
				if (room && room.game === game) {
					const updatedRooms = { ...$rooms, [key]: room };
					if (!isEqual($rooms, updatedRooms)) {
						$rooms = updatedRooms;
						callback($rooms);
					}
				}
			});
	}

	function waiting(game: string, callback): IGunChainReference<any, 'rooms', false> {
		let $rooms: Record<string, Room> = {};

		return ref.map().on((room, key) => {
			// ref.get(key).put(null); // DELETE ALL ROOMS
			if (room && room.game === game && room.stateIndex === 0) {
				const updatedRooms = { ...$rooms, [key]: room };
				if (!isEqual($rooms, updatedRooms)) {
					$rooms = updatedRooms;
					callback($rooms);
				}
			} else if (room && room.game && key in $rooms) {
				delete $rooms[key];
				callback($rooms);
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

		function players(callback): IGunChainReference<any, 'players', false> {
			let currentPlayers: Record<string, User> = {};

			return roomRef
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
			roomRef.once((room) => {
				const stateIndex = room.stateIndex + 1;
				const state = JSON.stringify(nextState);
				roomRef.put({ state, stateIndex });
			});
		}

		function subscribe(callback): IGunChainReference<any, string, false> {
			return roomRef.on((data) => {
				if (data) {
					callback(data);
				}
			});
		}

		function once(callback): IGunChainReference<any, string, false> {
			return roomRef.on((data) => {
				if (data) {
					callback(data);
				}
			});
		}

		return {
			addPlayer,
			players,
			publishState,
			subscribe,
			once
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
		get
	};
}

const ref = db.get('rooms');
export const rooms = createRoomsStore(ref);
