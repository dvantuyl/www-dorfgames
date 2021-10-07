<script context="module" lang="ts">
	export async function load({ page, fetch }) {
		try {
			const Game = (await import(`../../../games/${page.params.game}/Game.svelte`)).default;
			const game = page.params.game;
			const gameMap = await gamesMapLoader(fetch);
			const gameTitle = gameMap[game];
			const props = { Game, game, gameTitle };
			return { props };
		} catch (e) {
			return {
				status: 404,
				error: e
			};
		}
	}

	async function gamesMapLoader(
		fetch: (info: RequestInfo) => Promise<Response>
	): Promise<Record<string, string>> {
		const res = await fetch('/games.json');

		if (res.ok) {
			return await res.json();
		} else {
			throw Error('#gamesMapLoader: Could not load /games.json');
		}
	}
</script>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { IGunChainReference } from 'gun/types/chain';
	import { browser } from '$app/env';
	import { session } from '$lib/stores';
	import { generateTitle } from '$lib/rooms/generateTitle';
	import { rooms } from '$lib/stores';

	import SessionWrapper from '$lib/session/SessionWrapper.svelte';
	import WaitingRooms from '$lib/rooms/WaitingRooms.svelte';
	import JoinedRooms from '$lib/rooms/JoinedRooms.svelte';
	import WaitingRoom from '$lib/rooms/WaitingRoom.svelte';
	import Button from '$lib/Button.svelte';

	export let Game;
	export let game;
	export let gameTitle;

	let players = [];
	let roomKey;
	let stateIndex = 0;
	let roomStore;
	let state;
	let roomTitle;
	let subscriptions = new Set<IGunChainReference>();

	onMount(() => {
		window.addEventListener('popstate', handleLocationChange);
	});

	onDestroy(() => {
		subscriptions.forEach((ref) => ref.off());
		if (browser) {
			window.removeEventListener('popstate', handleLocationChange);
		}
	});

	function handleLocationChange() {
		const url = new URL(window.location.href);
		if (url.hash) {
			roomKey = url.hash.substring(1);
		} else {
			roomKey = null;
			roomStore = null;
		}
	}

	$: if (roomKey) {
		roomStore = rooms.get(roomKey);
	}

	$: if (roomStore) {
		subscriptions.add(
			roomStore.subscribe((updatedRoom) => {
				roomTitle = updatedRoom.title;
				stateIndex = updatedRoom.stateIndex;
				state = updatedRoom.state ? JSON.parse(updatedRoom.state) : {};
			})
		);
		subscriptions.add(roomStore.players((p) => (players = p)));
	}

	// Add User to room
	$: if (roomStore && stateIndex === 0 && $session.user) {
		roomStore.join();
	}

	function createGame() {
		const url = new URL(window.location.href);
		const title = generateTitle();
		roomKey = rooms.create(game, title);
		url.hash = roomKey;
		window.location.assign(url.href);
	}

	function enterRoom(event) {
		const url = new URL(window.location.href);
		roomKey = event.detail.room;
		url.hash = roomKey;
		window.location.assign(url.href);
	}

	function handleStartGame() {
		roomStore.publishState({});
	}
</script>

<svelte:head>
	<title>{gameTitle}{roomTitle ? ` [${roomTitle}]` : ''}</title>
</svelte:head>

<SessionWrapper>
	{#if roomStore && stateIndex > 0}
		<svelte:component
			this={Game}
			room={{
				init: stateIndex === 1,
				players,
				sessionPlayer: $session.user,
				publishState: roomStore.publishState
			}}
			{state}
		/>
	{:else if roomStore && stateIndex === 0}
		<h2 class="mb-5 text-3xl text-purple-900 font-bold text-center capitalize">
			{roomTitle || roomKey}
		</h2>
		<WaitingRoom {players} on:startGame={handleStartGame} />
	{:else}
		<h2 class="mb-5 text-3xl text-purple-900 font-bold text-center capitalize">{gameTitle}</h2>
		<div class="px-5">
			<Button on:click={createGame}>Create Game</Button>
		</div>
		<JoinedRooms on:click={enterRoom} {game} />
		<br />
		<WaitingRooms on:click={enterRoom} {game} />
	{/if}
</SessionWrapper>
