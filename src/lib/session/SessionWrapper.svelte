<script>
	import { session } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';
	import SignInForm from '$lib/header/SignInForm.svelte';

	let isModalOpen = true;
</script>

{#if $session.user}
	<slot />
{:else}
	<Modal
		bind:isModalOpen
		background={false}
		transition={{ y: -10, opacity: 0 }}
		className="top-12 right-5 rounded-b-xl shadow-lg"
	>
		<SignInForm {isModalOpen} />
	</Modal>
{/if}
