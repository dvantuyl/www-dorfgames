<script lang="ts">
	import TokensSection from './sections/TokensSection.svelte';
	import PlayersSection from './sections/PlayersSection.svelte';
	import ActionsSection from './sections/ActionsSection.svelte';
	import type { GameCtx, GameEvt } from '../game/types';
	import type { StateMachine } from 'xstate';
	import GoalsSection from './sections/GoalsSection.svelte';
	import CardsSection from './sections/CardsSection.svelte';

	export let game: StateMachine<GameCtx, any, GameEvt>;
	export let room;
</script>

<div class="w-full h-full grid board">
	<div class="col-span-2">
		<PlayersSection {game} />
	</div>
	<div>
		<GoalsSection />
	</div>
	<div class="row-span-2">
		<TokensSection {game} />
	</div>
	<div>
		<CardsSection {game} />
	</div>
	<div class="col-span-2">
		<ActionsSection {game} {room} />
	</div>
</div>

<style>
	.board {
		grid-template-columns: 6fr 1fr;
		grid-template-rows: 2fr 1fr 6fr 1fr;
	}
</style>
