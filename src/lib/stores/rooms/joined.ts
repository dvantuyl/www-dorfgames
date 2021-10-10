import type { IGunChainReference } from 'gun/types/chain';
import { session } from '$lib/stores';
import isEqual from 'lodash/isEqual.js';
import type { Room } from '$lib/types';
import GUN from 'gun';

export function joined(
	game: string,
	callback: ($rooms: Record<string, Room>) => void
): IGunChainReference<any, 'rooms', false> {
	let $rooms: Record<string, Room> = {};

	return session
		.userRef()
		.get('rooms')
		.map()
		.on((room, key) => {
			if (oldJoinedRoom(room)) {
				console.log('deletedOldJoinedRoom', room.title);
				session.userRef().get('rooms').get(key).put(null);
				delete $rooms[key];
				room = null;
			}

			if (room && room.game === game) {
				const updatedRooms = { ...$rooms, [key]: room };
				if (!isEqual($rooms, updatedRooms)) {
					$rooms = updatedRooms;
					callback($rooms);
				}
			}
		});
}

function oldJoinedRoom(room): boolean {
	const oldHours = 2;
	const oldDate = new Date(+new Date() - 1 * 1000 * 60 * 60 * oldHours);
	const roomUpdated = GUN.state.is(room, 'stateIndex');
	const roomUpdatedDate = roomUpdated ? new Date(roomUpdated) : null;
	return roomUpdatedDate && oldDate > roomUpdatedDate;
}
