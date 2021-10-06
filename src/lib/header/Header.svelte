<script>
	import { user } from '$lib/session/user';
	import Modal from '$lib/Modal.svelte';
	import SignInForm from '$lib/session/SignInForm.svelte';
	import { page } from '$app/stores';

	let isModalOpen = false;

	$: showTitle = $page.path !== '/';
</script>

<div class="flex justify-between items-center h-full w-full">
	<div class="flex items-bottom">
		{#if showTitle}
			<h1 class="text-xl font-bold"><a href="/">Dorfgames</a></h1>
		{/if}
	</div>

	<div class="flex gap-2 divide-x-2 divide-green-500 items-center">
		<div><a href="/games" class="font-semibold">Games</a></div>
		{#if $user.alias}
			<div class="flex items-center pl-2">
				<button class="flex items-center">
					<span on:click={() => (isModalOpen = true)} class="font-bold block mr-2"
						>{$user.alias}</span
					>
					<img
						on:click={() => (isModalOpen = true)}
						class="block w-10 mr-5"
						src={`https://avatars.dicebear.com/api/initials/${$user.alias}.svg`}
						alt="avatar"
					/>
				</button>
				<button class="signout-button block font-semibold" on:click={() => user.signout()}>
					Sign Out
				</button>
			</div>
		{:else}
			<div class="pl-2">
				<button class="signout-button block font-semibold" on:click={() => (isModalOpen = true)}>
					Sign In
				</button>
			</div>
		{/if}
	</div>

	<slot />
</div>

<Modal
	bind:isModalOpen
	background={false}
	transition={{ y: -50, opacity: 0 }}
	className="top-12 right-5 rounded-b-xl shadow-lg"
>
	<SignInForm bind:isModalOpen />
</Modal>
