<script>
	import { browser } from '$app/env';
	import { session, rooms } from '$lib/stores';
	import Modal from '$lib/Modal.svelte';
	import SignInForm from '$lib/session/SignInForm.svelte';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';

	let isModalOpen = false;
	let gameRoomBreadcrumb = {};

	$: showTitle = $page.path !== '/';

	onMount(() => {
		window.addEventListener('popstate', setBreadCrumbs);
		setBreadCrumbs();
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('popstate', setBreadCrumbs);
		}
	});

	function setBreadCrumbs() {
		const url = new URL(window.location.href);
		const pathItems = url.pathname.split('/').filter((i) => i.length);
		const [namespace, ...rest] = [...pathItems, url.hash.substring(1)].filter((i) => i.length);

		// Set Games Breadcrumbs
		if (namespace === 'games') {
			const [game, room] = rest;
			if (game && room) {
				gameRoomBreadcrumb = { game, room };
				rooms
					.get(room)
					.once((data) => (gameRoomBreadcrumb = { ...gameRoomBreadcrumb, roomTitle: data.title }));
			} else if (game) {
				gameRoomBreadcrumb = { game };
			}
		} else {
			gameRoomBreadcrumb = {};
		}
	}
</script>

<div class="flex justify-between items-center h-full w-full">
	<div class="flex items-center">
		{#if showTitle}
			<h1 class="text-xl font-bold text-purple-900"><a href="/">Dorfgames</a></h1>
		{/if}
		{#if gameRoomBreadcrumb.game}
			<i class="hidden md:block text-xl font-bold text-gray-500 mx-2">navigate_next</i>
			<h1 class="hidden md:block text-xl font-bold capitalize text-purple-900">
				<a rel="external" href="/games/{gameRoomBreadcrumb.game}">{gameRoomBreadcrumb.game}</a>
			</h1>
		{/if}
		{#if gameRoomBreadcrumb.room && gameRoomBreadcrumb.roomTitle}
			<i class="hidden md:block text-xl font-bold text-gray-500 mx-2">navigate_next</i>
			<h1 class="hidden md:block text-xl font-bold capitalize text-gray-600">
				{gameRoomBreadcrumb.roomTitle}
			</h1>
		{/if}
	</div>

	<div class="flex gap-2 divide-x-2 divide-green-500 items-center">
		<div><a href="/games" class="font-semibold">Games</a></div>
		{#if $session.user.alias}
			<div class="flex items-center pl-2">
				<button class="flex items-center">
					<span on:click={() => (isModalOpen = true)} class="font-bold block mr-2"
						>{$session.user.alias}</span
					>
					<img
						on:click={() => (isModalOpen = true)}
						class="block w-10 mr-5"
						src={`https://avatars.dicebear.com/api/initials/${$session.user.alias}.svg`}
						alt="avatar"
					/>
				</button>
				<button class="signout-button block font-semibold" on:click={() => session.signout()}>
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
