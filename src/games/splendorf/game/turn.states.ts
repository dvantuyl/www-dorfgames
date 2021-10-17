import { send, assign } from 'xstate';

export const turnStates = {
	initial: 'startingTurn',
	states: {
		startingTurn: {
			on: {
				SELECT_TOKEN: {
					// cond: 'canSelectToken',
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
					// cond: 'canSelectToken',
					actions: [
						(ctx, evt) => console.log('selectingTokens, SELECT_TOKEN', evt.color),
						assign((ctx, evt) => {
							console.log('3rd assign', evt);
							return ctx;
						})
						// assign({
						// 	tokens: (_, evt) => {
						// 		console.log('assign inside', evt);
						// 		return { bk: 0, re: 0, wh: 0, bl: 0, gr: 0, go: 0 };
						// 	}
						// 	// players,
						// 	// turn
						// })
					]
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
