<script>
	import { session } from '$lib/stores';
	import { onMount } from 'svelte';

	export let isModalOpen;

	let alias = '';

	$: label = $session.user ? 'Change Name' : `Hi ${alias}!`;
	$: buttonText = $session.user ? 'Party!' : "Let's Go!";

	onMount(() => {
		if ($session.user) {
			alias = $session.user.alias;
		}
	});

	function letsGo() {
		session.register(alias);
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
