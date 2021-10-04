import { db } from '$lib/session/user';

export function publishState({
	stateIndex,
	game,
	room,
	state
}: {
	stateIndex: number;
	game: string;
	room: string;
	state: Record<string, unknown>;
}): void {
	const nextStateIndex = stateIndex + 1;
	const updatedState = state;
	db.get(game).get(room).get('state').put(JSON.stringify({ nextStateIndex, updatedState }));
}
