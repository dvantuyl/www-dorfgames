<script>
	import { createEventDispatcher } from 'svelte';
	import { ColorClass } from './colorclass';

	export let count = 0;
	export let color;
	export let disabled;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click', { color });
	}
</script>

<button
	class="relative h-full w-full transform disabled:scale-90 disabled:opacity-80 disabled:cursor-not-allowed"
	on:click={handleClick}
	disabled={disabled(color)}
>
	<div class="absolute top-0 left-0 w-full h-full">
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			class="fill-current {ColorClass[color].bd}"
		>
			<circle cx="50" cy="50" r="42" />
		</svg>
	</div>
	<div class="absolute top-0 left-0 w-full h-full">
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			class="fill-current {ColorClass[color].bg}"
		>
			<circle cx="50" cy="50" r="36" />
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
</button>
