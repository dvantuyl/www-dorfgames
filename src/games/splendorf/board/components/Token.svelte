<script>
	import { ColorClass } from './colorclass';

	export let count = 0;
	export let color;
	export let style = '';
</script>

<div class="relative h-full w-auto ${style}">
	<div class="absolute top-0 left-0 w-auto h-full">
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			class="fill-current {ColorClass[color].text.bd}"
		>
			<circle cx="50" cy="50" r="50" />
		</svg>
	</div>
	<div class="absolute top-0 left-0 w-auto h-full">
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			class="fill-current {ColorClass[color].text.bg}"
		>
			<circle cx="50" cy="50" r="40" />
		</svg>
	</div>
	<div class="absolute top-0 left-0 w-auto h-full">
		<svg
			height="100%"
			width="100%"
			viewBox="0 0 100 100"
			class="fill-current {ColorClass[color].text.tx}"
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
