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

<div class="w-auto h-full grid grid-cols-7 grid-rows-10">
	<div class="row-span-2 col-span-7">
		<PlayersSection {game} />
	</div>
	<div class="col-span-6">
		<GoalsSection />
	</div>
	<div class="row-span-6">
		<TokensSection {game} />
	</div>
	<div class="row-span-5 col-span-6">
		<CardsSection {game} />
	</div>
	<div class="col-span-7">
		<ActionsSection {game} {room} />
	</div>
</div>

<!-- <CardModal /> -->
