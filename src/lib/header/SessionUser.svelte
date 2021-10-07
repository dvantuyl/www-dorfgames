<script>
	import { browser } from '$app/env';
	import { session } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';
	import SignInForm from '$lib/header/SignInForm.svelte';
	import SessionMenu from '$lib/header/SessionMenu.svelte';
	import { onDestroy, onMount } from 'svelte';

	let isModalOpen = false;

	onMount(() => {
		window.addEventListener('popstate', handleLocationChange);
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('popstate', handleLocationChange);
		}
	});

	function handleLocationChange() {
		isModalOpen = false;
	}
</script>

{#if $session.user}
	<div class="flex items-center pl-2">
		<button class="flex items-center">
			<span on:click={() => (isModalOpen = true)} class="font-bold block mr-2"
				>{$session.user.alias}</span
			>
			<img
				on:click={() => (isModalOpen = true)}
				class="block w-10"
				src={`https://avatars.dicebear.com/api/initials/${$session.user}.svg`}
				alt="avatar"
			/>
		</button>
	</div>
{:else}
	<div class="pl-2">
		<button class="block font-semibold" on:click={() => (isModalOpen = true)}> Sign In </button>
	</div>
{/if}

<Modal
	bind:isModalOpen
	background={false}
	transition={{ y: -10, opacity: 0 }}
	className="top-12 right-5 rounded-b-xl shadow-lg"
>
	{#if $session.user}
		<SessionMenu bind:isModalOpen />
	{:else}
		<SignInForm bind:isModalOpen />
	{/if}
</Modal>
