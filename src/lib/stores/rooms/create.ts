import { db } from '$lib/stores';

export function create(game: string, title: string): string {
	const roomRef = db.get('rooms').set({
		game,
		title,
		stateIndex: 0,
		state: ''
	});
	return roomRef._.get;
}
