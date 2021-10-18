<script lang="ts">
	import TokensSection from './sections/TokensSection.svelte';
	import PlayersSection from './sections/PlayersSection.svelte';
	import ActionsSection from './sections/ActionsSection.svelte';
	import type { GameCtx, GameEvt } from '../game';
	import type { StateMachine } from 'xstate';
	import GoalsSection from './sections/GoalsSection.svelte';
	import CardsSection from './sections/CardsSection.svelte';
	import CardViewer from './modals/CardView.svelte';

	export let game: StateMachine<GameCtx, any, GameEvt>;
	export let room;

	//game.
</script>

<div class="w-full h-full bg-warmGray-600">
	<div class="sm:max-w-6xl mx-auto">
		<div class="board w-auto h-full grid gap-1 sm:gap-3">
			<div style="grid-area: PLR">
				<PlayersSection {game} />
			</div>
			<!-- <div style="grid-area: GOL">
				<GoalsSection />
			</div> -->
			<div
				class="grid gap-1 grid-flow-col auto-cols-1fr sm:gap-3 sm:grid-flow-row sm:auto-rows-1fr"
				style="grid-area: TKN"
			>
				<TokensSection {game} />
			</div>
			<CardsSection {game} row={2} />
			<CardsSection {game} row={1} />
			<CardsSection {game} row={0} />
			<div style="grid-area: ACT">
				<ActionsSection {game} {room} />
			</div>
		</div>
	</div>
</div>

<CardViewer {game} />

<style>
	/* MOBILE LAYOUT */
	.board {
		grid-template-columns: 0.5fr repeat(4, 1fr);
		grid-template-rows: repeat(5, min-content) 1fr 1fr;
		grid-template-areas:
			'PLR PLR PLR PLR PLR'
			'GOL GOL GOL GOL GOL'
			'R2D R20 R21 R22 R23'
			'R1D R10 R11 R12 R13'
			'R0D R00 R01 R02 R03'
			'TKN TKN TKN TKN TKN'
			'ACT ACT ACT ACT ACT';
	}

	/* SCREEN LAYOUT */
	@media (min-width: 640px) {
		.board {
			grid-template-columns: 0.66fr 0.5fr repeat(4, 1fr) 2fr;
			grid-template-rows: repeat(4, min-content);
			grid-template-areas:
				'TKN GOL GOL GOL GOL GOL PLR'
				'TKN R2D R20 R21 R22 R23 PLR'
				'TKN R1D R10 R11 R12 R13 PLR'
				'TKN R0D R00 R01 R02 R03 ACT';
		}
	}
</style>
