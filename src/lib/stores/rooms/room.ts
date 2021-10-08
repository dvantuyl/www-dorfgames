import pick from 'lodash/pick.js';
import type { Room, Users } from '$lib/types';
import type { IGunChainReference } from 'gun/types/chain';
import isEqual from 'lodash/isEqual.js';
import { db, session } from '$lib/stores';

type RoomRef = IGunChainReference<any, string, false>;

function createRoomStore(ref: IGunChainReference<any, 'rooms', false>) {
	return (roomKey: string) => {
		const roomRef: RoomRef = ref.get(roomKey);

		return {
			join: () => join(roomRef),
			once: (callback: (room: Room) => void) => once(roomRef, callback),
			users: (callback: (users: Users) => void) => users(roomRef, callback),
			publishState: (nextState: Record<string, unknown>) => publishState(roomRef, nextState),
			subscribe: (callback: (room: Room) => void) => subscribe(roomRef, callback)
		};
	};
}

function join(roomRef: RoomRef): void {
	roomRef.get('users').set(session.userRef());
	session.userRef().get('rooms').set(roomRef);
}

function once(
	roomRef: RoomRef,
	callback: (room: Room) => void
): IGunChainReference<any, string, false> {
	return roomRef.on((data: Room) => {
		if (data) {
			callback(data);
		}
	});
}

function users(
	roomRef: RoomRef,
	callback: (users: Users) => void
): IGunChainReference<any, 'users', false> {
	let currentUsers: Users = {};

	return roomRef
		.get('users')
		.map()
		.on((data, id) => {
			if (data) {
				const updatedUsers = {
					...currentUsers,
					[id]: { ...pick(data, ['alias', 'createdAt', 'loginAt']), id }
				};
				if (!isEqual(currentUsers, updatedUsers)) {
					currentUsers = updatedUsers;
					callback(currentUsers);
				}
			}
		});
}

function publishState(roomRef: RoomRef, nextState: Record<string, unknown>): void {
	roomRef.once((room) => {
		const stateIndex = room.stateIndex + 1;
		const state = JSON.stringify(nextState);
		roomRef.put({ state, stateIndex });
	});
}

function subscribe(
	roomRef: RoomRef,
	callback: (room: Room) => void
): IGunChainReference<any, string, false> {
	return roomRef.on((data: Room) => {
		if (data) {
			callback(data);
		}
	});
}

const ref = db.get('rooms');
export const room = createRoomStore(ref);
