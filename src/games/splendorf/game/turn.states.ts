import { send, assign } from 'xstate';

export const turnStates = {
	initial: 'startingTurn',
	states: {
		takingTurn: {
			on: {
				SELECT_TOKEN: {
					cond: 'canSelectTokens',
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
				SELECT_TOKEN: {
					cond: 'canSelectToken',
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
