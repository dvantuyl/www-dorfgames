<script>
	import { browser } from '$app/env';

	import { page } from '$app/stores';
	import { rooms } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		window.addEventListener('popstate', setBreadCrumbs);
		setBreadCrumbs();
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('popstate', setBreadCrumbs);
		}
	});

	let gameRoomBreadcrumb = {};
	$: showTitle = $page.path !== '/';

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
