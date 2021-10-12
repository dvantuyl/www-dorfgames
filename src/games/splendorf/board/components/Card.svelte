<script>
	import { ColorClass } from './colorclass';
	import Token from './Token.svelte';
	export let clr;
	export let pts;
	export let cost;
</script>

<div class="mx-auto aspect-w-2 aspect-h-3 rounded-full">
	<div class="w-full h-full rounded flex p-2 {ColorClass[clr].bg}">
		<div class="w-1/2 h-full flex flex-col justify-end">
			{#each Object.entries(cost) as cost}
				{#if cost[1]}
					<div class="h-1/5 w-full">
						<div class="h-full py-1">
							<Token color={cost[0]} count={cost[1]} />
						</div>
					</div>
				{/if}
			{/each}
		</div>
		<div class="relative w-1/2 h-auto opacity-80" class:hidden={!pts}>
			<div class="absolute top-0 right-0 w-full h-auto">
				<svg height="100%" width="100%" viewBox="0 0 100 100" class="fill-current text-black">
					<text
						x="70"
						y="50"
						dominant-baseline="middle"
						text-anchor="middle"
						class="text-7xl font-black {ColorClass[clr].text.tx}"
					>
						{pts}
					</text>
				</svg>
			</div>
		</div>
	</div>
</div>
