import { writable } from 'svelte/store';
import type { Players, ColorType } from '../index';

function createPlayersStore() {
	const { subscribe, set, update } = writable({
		currentPlayerIndex: 0,
		list: []
	} as Players);

	const player = (sessionPlayerId: string) => {
		function tokensIncrement(clr: ColorType) {
			update((players: Players) => {
				return {
					...players,
					list: players.list.map((player) => {
						if (player.id === sessionPlayerId) {
							player.tokens[clr] = player.tokens[clr] + 1;
						}
						return player;
					})
				};
			});
		}

		function tokensDecrement(clr: ColorType) {
			update((players: Players) => {
				return {
					...players,
					list: players.list.map((player) => {
						if (player.id === sessionPlayerId) {
							player.tokens[clr] = player.tokens[clr] + 1;
						}
						return player;
					})
				};
			});
		}

		return {
			tokens: {
				increment: tokensIncrement,
				decrement: tokensDecrement
			}
		};
	};

	return {
		subscribe,
		player,
		set
	};
}

export const players = createPlayersStore();
