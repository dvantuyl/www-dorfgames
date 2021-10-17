import { send, assign } from 'xstate';

export const turnStates = {
	initial: 'startingTurn',
	states: {
		startingTurn: {
			on: {
				CAN_SELECT_TOKEN: {
					// cond: 'canSelectToken'
				},
				SELECT_TOKEN: {
					actions: [
						(ctx, evt) => console.log('startingTurn, SELECT_TOKEN', evt),
						send((_, evt) => ({ ...evt }))
					],
					target: 'selectingTokens'
				}
			}
		},
		selectingTokens: {
			on: {
				CAN_SELECT_TOKEN: {
					cond: 'canSelectToken'
				},
				SELECT_TOKEN: {
					actions: 'selectToken'
				},
				RESET_TURN: {
					target: 'startingTurn'
				},
				END_TURN: { target: 'endingTurn' }
			}
		},
		buyingCard: {
			on: {
				RESET_TURN: {
					target: 'startingTurn'
				},
				END_TURN: {
					target: 'endingTurn'
				}
			}
		},
		endingTurn: {
			type: 'final' as const
		}
	}
};
