<script>
	import { onMount } from 'svelte';

	import { user } from './user';

	export let isModalOpen;

	let alias = '';

	$: label = $user.alias ? 'Change Name' : `Hi ${alias}!`;
	$: buttonText = $user.alias ? 'Party!' : "Let's Go!";

	onMount(() => {
		if ($user.alias) {
			alias = $user.alias;
		}
	});

	function letsGo() {
		user.setAlias(alias);
		isModalOpen = false;
	}

	function handleKeyDown(event) {
		if (event.keyCode === 13) letsGo();
	}
</script>

<div class="w-60 h-60 p-2 bg-white flex flex-col justify-around items-center">
	<label for="alias">{label}</label>
	<input
		name="alias"
		bind:value={alias}
		minlength="3"
		maxlength="16"
		placeholder="My Name is..."
		on:keydown={handleKeyDown}
	/>

	<button class:opacity-0={alias.length < 3} on:click={letsGo}>{buttonText}</button>
</div>

<style>
	label {
		@apply text-xl font-bold;
	}

	input {
		@apply h-10 leading-10 border-b-2 border-gray-100 focus:outline-none text-center text-lg;
	}

	button {
		@apply rounded-xl border-4 border-green-300 bg-green-100 px-3 py-1 text-lg font-bold text-green-800 w-full;
	}
</style>
