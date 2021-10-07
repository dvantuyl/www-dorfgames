import type { Room } from '$lib/types';
import type { IGunChainReference } from 'gun/types/chain';
import { db } from '$lib/stores';
import isEqual from 'lodash/isEqual.js';

export function waiting(
	game: string,
	callback: ($rooms: Record<string, Room>) => void
): IGunChainReference<any, 'rooms', false> {
	let $rooms: Record<string, Room> = {};

	return db
		.get('rooms')
		.map()
		.on((room, key) => {
			// ref.get(key).put(null); // DELETE ALL ROOMS
			if (room && room.game === game && room.stateIndex === 0) {
				const updatedRooms = { ...$rooms, [key]: room };
				if (!isEqual($rooms, updatedRooms)) {
					$rooms = updatedRooms;
					callback($rooms);
				}
			} else if (key in $rooms) {
				delete $rooms[key];
				callback($rooms);
			}
		});
}
