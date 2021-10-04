import { db } from '$lib/session/user';

export function roomState(
	game: string,
	room: string,
	callback: (stateIndex: number, updatedState: Record<string, unknown>) => void
): void {
	let stateIndex;

	db.get(game)
		.get(room)
		.get('state')
		.on((data) => {
			if (data) {
				const { nextStateIndex, updatedState } = JSON.parse(data);
				if (stateIndex !== nextStateIndex) {
					stateIndex = nextStateIndex;
					callback(stateIndex, updatedState);
					console.log('roomState', stateIndex, updatedState);
				}
			}
		});
}
