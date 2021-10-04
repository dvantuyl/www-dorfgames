import { db } from '$lib/session/user';

export function waitingRooms(game: string, callback: (rooms: string[]) => void): void {
	let rooms: string[] = [];

	db.get(game)
		.map()
		.on((data, room) => {
			if (data && room && !data.state && !rooms.some((r) => r === room)) {
				try {
					rooms = [...rooms, room];
					callback(rooms);
					console.log('gameRooms', rooms);
				} catch (e) {
					console.log('Deleting Deprecated Room', e, room, data);
					db.get(game).get(room).put(null);
				}
			}
		});
}
