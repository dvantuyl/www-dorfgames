<script>
	import { user } from '$lib/session/user';
	import Modal from '$lib/Modal.svelte';
	import SignInForm from '$lib/session/SignInForm.svelte';

	let isModalOpen = false;
</script>

<div class="flex justify-between items-center h-full w-full">
	<div class="flex items-bottom">
		<h1 class="text-xl font-bold"><a href="/">Dorfgames</a></h1>
	</div>

	{#if $user.alias}
		<div class="flex items-center">
			<button class="flex items-center">
				<span on:click={() => (isModalOpen = true)} class="font-bold block mr-2">{$user.alias}</span
				>
				<img
					on:click={() => (isModalOpen = true)}
					class="block w-10 mr-5"
					src={`https://avatars.dicebear.com/api/initials/${$user.alias}.svg`}
					alt="avatar"
				/>
			</button>
			<button class="signout-button block" on:click={() => user.signout()}> Sign Out </button>
		</div>
	{:else}
		<button class="signout-button block" on:click={() => (isModalOpen = true)}> Sign In </button>
	{/if}
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
