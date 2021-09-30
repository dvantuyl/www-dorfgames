<script>
	import { user } from '$lib/session/user';
	import Modal from '$lib/Modal.svelte';
	import SignInForm from '$lib/session/SignInForm.svelte';

	let isModalOpen = true;
</script>

{#if $user.alias}
	<slot />
{:else}
	<Modal
		bind:isModalOpen
		background={false}
		transition={{ y: -50, opacity: 0 }}
		className="top-12 right-5 rounded-b-xl shadow-lg"
	>
		<SignInForm />
	</Modal>
{/if}
