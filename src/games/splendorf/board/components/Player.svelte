<script lang="ts">
	import { colors, Player } from '../../game'
	import TokenCard from './TokenCard.svelte'
	export let player: Player;

	const initials = player.name.split(' ').map(n => n[0]).join('')
</script>

<div class="w-full h-12 rounded bg-white bg-opacity-20 p-2 flex justify-between items-center">
	<div class="flex-none font-black text-red-900 text-2xl">
		{initials}
	</div>
	{#each colors as color}
		<TokenCard cardCount={0} tokenCount={player.tokens[color]} {color} />
	{/each}
</div>