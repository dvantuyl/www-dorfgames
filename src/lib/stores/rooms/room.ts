import type { Room, User } from '$lib/types';
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
			players: (callback: (players: User[]) => void) => players(roomRef, callback),
			publishState: (nextState: Record<string, unknown>) => publishState(roomRef, nextState),
			subscribe: (callback: (room: Room) => void) => subscribe(roomRef, callback)
		};
	};
}

function join(roomRef: RoomRef): void {
	roomRef.get('players').set(session.userRef());
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

function players(
	roomRef: RoomRef,
	callback: (players: User[]) => void
): IGunChainReference<any, 'players', false> {
	let currentPlayers: Record<string, User> = {};

	return roomRef
		.get('players')
		.map()
		.on((data, userId) => {
			if (data && data.alias) {
				const updatedPlayers = { ...currentPlayers, [userId]: data };
				if (!isEqual(currentPlayers, updatedPlayers)) {
					currentPlayers = updatedPlayers;
					callback(Object.values(currentPlayers));
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
