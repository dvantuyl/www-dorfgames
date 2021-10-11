<script>
	import { ColorClass } from './colorclass';
	import Token from './Token.svelte';
	export let card;
</script>

<div class="w-full h-full relative rounded flex p-2 {ColorClass[card.clr].bg}">
	<div class="absolute bottom-0 left-0 grid grid-flow-col-dense grid-rows-5 h-full w-1/2">
		{#each Object.entries(card.cost) as cost}
			{#if cost[1]}
				<Token color={cost[0]} count={cost[1]} />
			{/if}
		{/each}
	</div>
	<div class="absolute top-0 right-0 opacity-80" class:hidden={!card.pts}>
		<svg height="100%" width="100%" viewBox="0 0 100 100" class="fill-current text-black">
			<text
				x="70"
				y="50"
				dominant-baseline="middle"
				text-anchor="middle"
				class="text-7xl font-black {ColorClass[card.clr].text.tx}"
			>
				{card.pts}
			</text>
		</svg>
	</div>
</div>
