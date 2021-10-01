import { db } from '$lib/session/user';
import type { User } from '$lib/session/user';
import _array from 'lodash/array.js';
import _object from 'lodash/object.js';
import isEqual from 'lodash/isEqual.js';

export function roomUsers(
	game: string,
	room: string,
	callback: (updatedUsers: User[]) => void
): void {
	let users: Record<string, User> = {};

	db.get(game)
		.get(room)
		.get('players')
		.map()
		.on((data) => {
			if (data && data.alias) {
				const user = _object.pick(data, ['uuid', 'alias']);
				const updatedUsers = { ...users };
				updatedUsers[user.uuid] = user;
				if (!isEqual(users, updatedUsers)) {
					users = updatedUsers;
					callback(Object.values(users));
					console.log(
						'roomUsers',
						Object.values(users).map((user: User) => user.alias)
					);
				}
			}
		});
}
