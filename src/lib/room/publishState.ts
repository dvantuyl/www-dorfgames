import { db } from '$lib/session/user';

export function publishState({
	game,
	room,
	state
}: {
	game: string;
	room: string;
	state: Record<string, unknown>;
}): void {
	db.get(game).get(room).get('state').put(JSON.stringify(state));
}
