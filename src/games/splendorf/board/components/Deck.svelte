<script>
	export let count;
</script>

<div class="h-full w-full relative rounded bg-red-600">
	<div class="absolute top-0 left-0 w-full h-full opacity-50">
		<svg height="100%" width="100%" viewBox="0 0 100 100" class="fill-current text-black">
			<text
				x="50"
				y="55"
				dominant-baseline="middle"
				text-anchor="middle"
				class="text-6xl font-black"
			>
				{count}
			</text>
		</svg>
	</div>
</div>
