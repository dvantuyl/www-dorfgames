<script>
	export let innerClass = '';
</script>

<button class={innerClass} on:click><slot /></button>

<style>
	button {
		@apply w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
	}
</style>
