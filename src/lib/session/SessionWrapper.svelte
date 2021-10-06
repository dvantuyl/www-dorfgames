<script>
	import { session } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';
	import SignInForm from '$lib/session/SignInForm.svelte';

	let isModalOpen = false;
	let showSignInForm = false;

	$: if (!$session.user) {
		isModalOpen = true;
		setTimeout(function () {
			showSignInForm = true;
		}, 500);
	} else {
		isModalOpen = false;
		showSignInForm = false;
	}
</script>

{#if $session.user}
	<slot />
{:else if showSignInForm}
	<Modal
		bind:isModalOpen
		background={false}
		transition={{ y: -50, opacity: 0 }}
		className="top-12 right-5 rounded-b-xl shadow-lg"
	>
		<SignInForm {isModalOpen} />
	</Modal>
{/if}
