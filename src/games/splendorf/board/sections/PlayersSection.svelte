<script lang="ts">
	import type { Player } from '../../game/types';
	import PlayerItem from '../components/PlayerItem.svelte';

	export let game;

	$: players = $game.context.playersRef.getSnapshot().context.players;

	$: orderedPlayers = Object.values(players).sort((a: Player, b: Player) => a.index - b.index);
</script>

<div class="h-full w-full">
	{#each orderedPlayers as player}
		<div class="pb-2 last:pb-0">
			<PlayerItem {player} />
		</div>
	{/each}
</div>
