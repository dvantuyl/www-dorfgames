<script lang="ts">
	import { pick } from 'lodash';
	import { clickOutside } from '$lib/actions/clickOutside';
	import Card from '../components/Card.svelte';

	export let cardCollection;
	export let cardView;

	$: opened = $cardCollection.value !== 'closed';
	$: cards = $cardCollection.context.cards;
	$: disablePrev = !$cardCollection.can({ type: 'PREV_COLLECTION' });
	$: disableNext = !$cardCollection.can({ type: 'NEXT_COLLECTION' });

	function handleClose() {
		cardCollection.send('CLOSE_CARD_COLLECTION');
	}
	function handlePrev() {
		cardView.send('PREV_COLLECTION');
	}
	function handleNext() {
		cardView.send('NEXT_COLLECTION');
	}
	function viewCard(index) {
		cardView.send('OPEN_CARD_VIEW', {
			cards,
			index,
			mode: 'player' as const
		});
		cardCollection.send('CLOSE_CARD_COLLECTION');
	}
	function returnCallback() {
		cardView.send('CLOSE_CARD_VIEW');
		cardCollection.send('OPEN_CARD_COLLECTION');
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
				class="inline-block overflow-hidden transform transition-all align-middle sm:max-w-xl w-full"
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
						<div
							class="w-full h-full grid grid-flow-row grid-cols-3 sm:grid-cols-4 grid-rows-3 gap-4 "
						>
							{#each cards as card, i}
								<button type="button w-full" on:click={() => viewCard(i)}>
									<Card {...pick(card, ['clr', 'pts', 'cost'])} />
								</button>
							{/each}
						</div>
						<div class="flex justify-around py-5 w-full">
							<button
								type="button"
								class="h-16 w-16 inline-flex justify-center items-center border-white border-4 border-opacity-70 rounded-full opacity-80 shadow-sm hover:border-opacity-90 focus:opacity-90"
								on:click={handleClose}
							>
								<i class="block text-5xl text-white font-semibold">clear</i>
							</button>
						</div>
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
