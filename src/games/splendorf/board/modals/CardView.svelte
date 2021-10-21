<script lang="ts">
	import { pick } from 'lodash';
	import { clickOutside } from '$lib/actions/clickOutside';
	import Card from '../components/Card.svelte';
	import { canBuyCard, canHoldCard } from '../../game';

	export let game;
	export let cardView;
	export let cardCollection;

	$: opened = $cardView.value !== 'closed';

	$: index = $cardView.context.index;
	$: card = $cardView.context.cards[index];
	$: disablePrevCard = !$cardView.can({ type: 'PREV_CARD' });
	$: disableNextCard = !$cardView.can({ type: 'NEXT_CARD' });
	$: disableReturnToCollectionPrev =
		$cardView.can({ type: 'PREV_CARD' }) || $cardView.context.mode !== 'player';
	$: disableReturnToCollectionNext =
		$cardView.can({ type: 'NEXT_CARD' }) || $cardView.context.mode !== 'player';
	$: disableBuy = !(
		$game.nextEvents.includes('BUY_CARD') &&
		canBuyCard($game.context, { type: 'BUY_CARD' as const, card, index })
	);

	$: disableHold = !(
		$game.nextEvents.includes('HOLD_CARD') &&
		canHoldCard($game.context, { type: 'HOLD_CARD' as const, card, index })
	);

	function handleClose() {
		cardView.send('CLOSE_CARD_VIEW');
	}
	function prevCard() {
		cardView.send('PREV_CARD');
	}
	function nextCard() {
		cardView.send('NEXT_CARD');
	}
	function returnToCollection() {
		cardCollection.send('OPEN_CARD_COLLECTION');
		cardView.send('CLOSE_CARD_VIEW');
	}
	function buyCard() {
		game.send('BUY_CARD', { card, index });
		cardView.send('CLOSE_CARD_VIEW');
	}
	function holdCard() {
		game.send('HOLD_CARD', { card, index });
		cardView.send('CLOSE_CARD_VIEW');
	}
</script>

{#if opened}
	<div
		class="fixed z-10 inset-0 overflow-y-auto"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="flex items-center sm:items-end justify-center min-h-screen py-4 text-center sm:block sm:p-0"
		>
			<div class="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" aria-hidden="true" />

			<!-- This element is to trick the browser into centering the modal contents. -->
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
				>&#8203;</span
			>

			<div
				use:clickOutside
				on:click-outside={handleClose}
				class="inline-block overflow-hidden transform transition-all align-middle sm:max-w-md w-full"
			>
				<div class="flex items-center">
					<div class="w-16 h-16 flex-none">
						<button
							class="disabled:hidden disabled:cursor-default"
							value="prev"
							on:click={prevCard}
							disabled={disablePrevCard}
							><i class="text-6xl text-white opacity-70 font-semibold">navigate_before</i></button
						>
						<button
							class="disabled:hidden disabled:cursor-default"
							value="prev"
							on:click={returnToCollection}
							disabled={disableReturnToCollectionPrev}
							><i class="text-6xl text-white opacity-70 font-semibold">navigate_before</i></button
						>
					</div>
					<div class="flex flex-col flex-grow items-center">
						<div class="w-full">
							<Card {...pick(card, ['clr', 'pts', 'cost'])} />
						</div>
						<div class="flex justify-around py-5 w-full">
							<button
								type="button"
								class="inline-flex items-center px-6 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-0 disabled:cursor-default"
								on:click={holdCard}
								disabled={disableHold}
							>
								<i>pan_tool</i>&nbsp&nbsp<span>HOLD</span>
							</button>
							<button
								type="button"
								class="inline-flex items-center px-6 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-0 disabled:cursor-default"
								on:click={buyCard}
								disabled={disableBuy}
							>
								<i>attach_money</i>&nbsp<span>BUY</span>
							</button>
						</div>
						<button
							type="button"
							class="h-16 w-16 inline-flex justify-center items-center border-white border-4 border-opacity-70 rounded-full opacity-80 shadow-sm hover:border-opacity-90 focus:opacity-90"
							on:click={handleClose}
						>
							<i class="block text-5xl text-white font-semibold">clear</i>
						</button>
					</div>
					<div class="w-16 h-16 flex-none">
						<button
							class="disabled:hidden disabled:cursor-default"
							value="next"
							on:click={nextCard}
							disabled={disableNextCard}
							><i class="text-6xl text-white opacity-70 font-semibold">navigate_next</i></button
						>
						<button
							class="disabled:hidden disabled:cursor-default"
							value="prev"
							on:click={returnToCollection}
							disabled={disableReturnToCollectionNext}
							><i class="text-6xl text-white opacity-70 font-semibold">navigate_next</i></button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
