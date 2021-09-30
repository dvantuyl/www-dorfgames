<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { clickOutside } from '$lib/actions/clickOutside';
	import Portal from './Portal.svelte';

	export let isModalOpen = false;
	export let background = true;
	export let transition: any = { opacity: 0, y: 100 };
	export let style = '';
	export let className = '';

	function closeModal() {
		isModalOpen = false;
	}
</script>

{#if isModalOpen}
	<Portal>
		<div class="modal-wrapper fixed inset-0 w-screen h-screen" transition:fly={transition}>
			<div class="modal-inner {className}" {style} use:clickOutside on:click-outside={closeModal}>
				<button class="absolute top-1 right-2" on:click={closeModal} aria-label="Close Modal Box"
					><i>close</i></button
				>
				<slot />
			</div>
		</div>
		{#if background}
			<div on:click={closeModal} transition:fade class="modal-background" />
		{/if}
	</Portal>
{/if}

<style>
	.modal-wrapper {
		z-index: 101;
	}
	.modal-inner {
		position: absolute;
		overflow: hidden;
	}
	.modal-background {
		background: black;
		opacity: 0.8;
		cursor: pointer;
		inset: 0;
		position: fixed;
		z-index: 100;
	}
</style>
