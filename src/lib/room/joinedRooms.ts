import { db } from '$lib/session/user';

export function joinedRooms(
	game: string,
	sessionUserId: string,
	callback: (rooms: string[]) => void
): void {
	let rooms: string[] = [];

	db.get(`users/${sessionUserId}`)
		.get(game)
		.get('rooms')
		.map()
		.on((room) => {
			if (room && !rooms.some((r) => r === room)) {
				try {
					rooms = [...rooms, room];
					callback(rooms);
					console.log('joinedRooms', rooms);
				} catch (e) {
					console.log('Deleting Deprecated Room', e, room);
					db.get(game).get(room).put(null);
				}
			}
		});
}
