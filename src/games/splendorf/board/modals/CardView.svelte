<script lang="ts">
	import { pick } from 'lodash';
	import { clickOutside } from '$lib/actions/clickOutside';
	import Card from '../components/Card.svelte';
	import { canBuyCard } from '../../game';

	export let game;
	export let cardView;

	$: opened = $cardView.value !== 'closed';

	$: index = $cardView.context.index;
	$: card = $cardView.context.cards[index];
	$: disablePrev = !$cardView.can({ type: 'PREV_CARD' });
	$: disableNext = !$cardView.can({ type: 'NEXT_CARD' });
	$: disableBuy = !(
		$game.nextEvents.includes('BUY_CARD') &&
		canBuyCard($game.context, { type: 'BUY_CARD' as const, card, index })
	);

	function handleClose() {
		cardView.send('CLOSE_CARD_VIEW');
	}
	function handlePrev() {
		cardView.send('PREV_CARD');
	}
	function handleNext() {
		cardView.send('NEXT_CARD');
	}
	function handleBuy() {
		game.send('BUY_CARD', { card, index });
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
					<button
						class="disabled:opacity-0 disabled:cursor-default"
						value="prev"
						on:click={handlePrev}
						disabled={disablePrev}
						><i class="text-6xl text-white opacity-70 font-semibold">navigate_before</i></button
					>
					<div class="flex flex-col flex-grow items-center">
						<div class="w-full">
							<Card {...pick(card, ['clr', 'pts', 'cost'])} />
						</div>
						<div class="flex justify-around py-5 w-full">
							<button
								type="button"
								class="inline-flex items-center px-6 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-0 disabled:cursor-default"
							>
								<i>pan_tool</i>&nbsp&nbsp<span>HOLD</span>
							</button>
							<button
								type="button"
								class="inline-flex items-center px-6 py-3 border border-transparent text-lg font-semibold rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-0 disabled:cursor-default"
								on:click={handleBuy}
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
					<button
						class="disabled:opacity-0 disabled:cursor-default"
						value="next"
						on:click={handleNext}
						disabled={disableNext}
						><i class="text-6xl text-white opacity-70 font-semibold">navigate_next</i></button
					>
				</div>
			</div>
		</div>
	</div>
{/if}