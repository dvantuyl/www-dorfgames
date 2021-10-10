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
			if (oldRoom(room)) {
				console.log('deletedOldRoom', room.title);
				db.get('rooms').get(key).put(null);
				delete $rooms[key];
				room = null;
			}

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

function oldRoom(room): boolean {
	const oldHours = 2;
	const oldDate = new Date(+new Date() - 1 * 1000 * 60 * 60 * oldHours);
	const roomUpdated = GUN.state.is(room, 'stateIndex');
	const roomUpdatedDate = roomUpdated ? new Date(roomUpdated) : null;
	return roomUpdatedDate && oldDate > roomUpdatedDate;
}
