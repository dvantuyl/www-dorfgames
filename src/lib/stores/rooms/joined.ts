import type { IGunChainReference } from 'gun/types/chain';
import { session } from '$lib/stores';
import isEqual from 'lodash/isEqual.js';
import type { Room } from '$lib/types';

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
			// session.userRef().get('rooms').get(key).put(null); // DELETE ALL JOINED ROOMS
			if (room && room.game === game) {
				const updatedRooms = { ...$rooms, [key]: room };
				if (!isEqual($rooms, updatedRooms)) {
					$rooms = updatedRooms;
					callback($rooms);
				}
			}
		});
}
