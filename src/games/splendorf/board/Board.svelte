<script lang="ts">
	import TokensSection from './sections/TokensSection.svelte';
	import PlayersSection from './sections/PlayersSection.svelte';
	import ActionsSection from './sections/ActionsSection.svelte';
	import type { GameCtx, GameEvent } from '../game/types';
	import type { StateMachine } from 'xstate';

	export let game: StateMachine<GameCtx, any, GameEvent>;
	export let room;
</script>

<div class="w-full h-full p-2 flex flex-col">
	<div class="flex-none w-full">
		<PlayersSection {game} />
	</div>

	<div class="w-1/6 flex-grow">
		<TokensSection {game} />
	</div>

	<div class="flex-none h-20 w-full">
		<ActionsSection {game} {room} />
	</div>
</div>
