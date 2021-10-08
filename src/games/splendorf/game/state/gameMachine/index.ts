import { createMachine } from 'xstate';
import type { GameState, GameEvent } from '../../types';
import { actions } from './actions';

export const gameMachine = createMachine<Record<'game', GameState>, GameEvent>(
	{
		id: 'gameMachine',
		initial: 'initializing',
		context: {
			game: {
				players: {
					currentPlayerIndex: 0,
					list: []
				},
				tokens: {
					bk: 0,
					wh: 0,
					re: 0,
					bl: 0,
					gr: 0,
					go: 0
				}
			}
		},
		states: {
			initializing: {
				on: {
					SETUP: {
						target: 'choosingNextPlayer',
						actions: ['setup']
					},
					READ: {
						target: 'choosingNextPlayer',
						actions: ['read']
					}
				}
			},
			publishing: {
				always: [
					{
						target: 'choosingNextPlayer',
						actions: ['publish']
					}
				]
			},
			choosingNextPlayer: {}
		}
	},
	{
		actions
	}
);
