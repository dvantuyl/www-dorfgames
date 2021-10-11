<script>
	import { ColorClass } from './colorclass';

	export let count = 0;
	export let color;
</script>

<div class="relative h-full w-full">
	<div class="absolute top-0 left-0 w-full h-full">
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			class="fill-current {ColorClass[color].bd}"
		>
			<circle cx="50" cy="50" r="50" />
		</svg>
	</div>
	<div class="absolute top-0 left-0 w-full h-full">
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			class="fill-current {ColorClass[color].bg}"
		>
			<circle cx="50" cy="50" r="40" />
		</svg>
	</div>
	<div class="absolute top-0 left-0 w-full h-full">
		<svg
			height="100%"
			width="100%"
			viewBox="0 0 100 100"
			class="fill-current {ColorClass[color].tx}"
		>
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
