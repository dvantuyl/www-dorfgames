import { db } from '$lib/session/user';

export function roomState(
	game: string,
	room: string,
	callback: (updatedState: Record<string, unknown>) => void
): void {
	let state: Record<string, unknown> = {};

	db.get(game)
		.get(room)
		.get('state')
		.on((data) => {
			if (data) {
				const updatedState = JSON.parse(data);
				if (updatedState.i !== state.i) {
					state = updatedState;
					callback(state);
					console.log('roomState', state);
				}
			}
		});
}
