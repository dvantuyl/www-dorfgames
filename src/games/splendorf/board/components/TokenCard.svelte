<script>
	import {ColorClass} from './colorclass'
	export let tokenCount = 0
	export let cardCount = 0
	export let color;


	const borderColor = `fill-current ${ColorClass[color].bd}`
	const backgroundColor = `fill-current ${ColorClass[color].bg}`
	const textColor = `fill-current ${ColorClass[color].tx}`
</script>

<div class="relative h-full w-full">
	{#if tokenCount > 0}
		<div class="absolute top-0 left-0 w-full h-full">
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 75 75"
				class={borderColor}>
				<circle cx="25" cy="25" r="25"></circle>
			</svg>
		</div>
	{/if}

	{#if cardCount > 0}
	<div class="absolute top-0 left-0 w-full h-full">
		<svg	
			width="100%"
			height="100%"
			viewBox="0 0 75 75"
			class={borderColor}>
				<rect x="25" y="25" width="40" height="50" rx="4"></rect>
		</svg>
	</div>	
	{/if}

	{#if tokenCount > 0}
	<div class="absolute top-0 left-0 w-full h-full">
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 75 75"
			class={backgroundColor}>
			<circle cx="25" cy="25" r="20"></circle>
		</svg>
	</div>
	{/if}

	{#if cardCount > 0}
	<div class="absolute top-0 left-0 w-full h-full">
		<svg	
			width="100%"
			height="100%"
			viewBox="0 0 75 75"
			class={backgroundColor}>
				<rect x="30" y="30" width="30" height="40" rx="4"></rect>
		</svg>
	</div>
	{/if}

	{#if tokenCount > 0}
	<div class="absolute top-0 left-0 w-full h-full">
		<svg
			height="100%"
			width="100%"
			viewBox="0 0 75 75"
			class={textColor}>
			<text
				x="25"
				y="28"
				dominant-baseline="middle"
				text-anchor="middle"
				class="text-3xl">
				{tokenCount}
			</text>
		</svg>
	</div>
	{/if}

	{#if cardCount > 0}
	<div class="absolute top-0 left-0 w-full h-full">
		<svg
			height="100%"
			width="100%"
			viewBox="0 0 75 75"
			class={textColor}>
			<text
				x="45"
				y="53"
				dominant-baseline="middle"
				text-anchor="middle"
				class="text-3xl">
				{cardCount}
			</text>
		</svg>
	</div>
	{/if}
</div>