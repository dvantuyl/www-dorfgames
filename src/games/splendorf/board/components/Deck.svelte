<script>
	export let count;
	export let row;
</script>

<div class="h-full sm:aspect-w-2 sm:aspect-h-3 rounded-full">
	<div class="w-full h-full">
		<div class="w-full h-full opacity-40">
			<svg height="100%" width="100%" viewBox="0 0 100 100" class="fill-current text-white">
				<text
					x="50"
					y="15"
					dominant-baseline="middle"
					text-anchor="middle"
					class="text-5xl font-black"
				>
					{count}
				</text>
				{#if row === 2}
					<circle cx="30" cy="50" r="6" />
					<circle cx="50" cy="50" r="6" />
					<circle cx="70" cy="50" r="6" />
				{:else if row === 1}
					<circle cx="40" cy="50" r="6" />
					<circle cx="60" cy="50" r="6" />
				{:else}
					<circle cx="50" cy="50" r="6" />
				{/if}
				<text
					x="50"
					y="90"
					dominant-baseline="middle"
					text-anchor="middle"
					class="text-3xl font-black"
				>
					left
				</text>
			</svg>
		</div>
	</div>
</div>
