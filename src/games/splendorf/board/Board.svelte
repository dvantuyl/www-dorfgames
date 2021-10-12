<script lang="ts">
	import TokensSection from './sections/TokensSection.svelte';
	import PlayersSection from './sections/PlayersSection.svelte';
	import ActionsSection from './sections/ActionsSection.svelte';
	import type { GameCtx, GameEvt } from '../game/types';
	import type { StateMachine } from 'xstate';
	import GoalsSection from './sections/GoalsSection.svelte';
	import CardsSection from './sections/CardsSection.svelte';
	import CardModal from './modals/CardModal.svelte';

	export let game: StateMachine<GameCtx, any, GameEvt>;
	export let room;
</script>

<div class="w-auto h-full board">
	<div style="grid-area: players">
		<PlayersSection {game} />
	</div>
	<div style="grid-area: goals">
		<GoalsSection />
	</div>
	<div style="grid-area: tokens">
		<TokensSection {game} />
	</div>
	<div style="grid-area: cards">
		<CardsSection {game} />
	</div>
	<div style="grid-area: actions">
		<ActionsSection {game} {room} />
	</div>
</div>

<!-- <CardModal /> -->
<style>
	.board {
		display: grid;
		grid-template-columns: 10fr 2fr;
		grid-template-rows: minmax(0 4fr) 2fr 9fr 2fr;
		grid-template-areas:
			'players players'
			'goals tokens'
			'cards tokens'
			'actions actions';
	}
</style>
