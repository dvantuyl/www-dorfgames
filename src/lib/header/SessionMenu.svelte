<script>
	import { session } from '$lib/stores';
	import SignInForm from '$lib/header/SignInForm.svelte';

	export let isModalOpen;

	let state = 'menu';

	function handleLogout() {
		isModalOpen = false;
		window.location.assign('/');
		session.logout();
	}
</script>

<div class="w-60 h-60 p-2 bg-white flex flex-col justify-around items-center">
	{#if state === 'menu'}
		<button on:click={() => (state = 'changeName')}>Change Name</button>
		<button on:click={handleLogout}>Sign Out</button>
	{:else if state === 'changeName'}
		<SignInForm bind:isModalOpen />
	{/if}
</div>

<style>
	button {
		@apply block font-semibold;
	}
</style>
