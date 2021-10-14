<script>
	export let count;
</script>

<div class="h-full sm:aspect-w-2 sm:aspect-h-3 rounded-full">
	<div class="w-full h-full rounded-lg bg-red-600">
		<div class="w-full h-full opacity-40">
			<svg height="100%" width="100%" viewBox="0 0 100 100" class="fill-current text-white">
				<text
					x="50"
					y="30"
					dominant-baseline="middle"
					text-anchor="middle"
					class="text-5xl font-black"
				>
					{count}
				</text>
				<text
					x="50"
					y="80"
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
