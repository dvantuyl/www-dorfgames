<script context="module">
	export async function load({ page, fetch }) {
		try {
			const Game = await import(`../../../games/${page.params.game}/Game.svelte`);
			const res = await fetch('/games.json');

			if (res.ok) {
				const gameMap = await res.json();
				const game = page.params.game;
				const gameTitle = gameMap[game];

				return {
					props: {
						Game: Game.default,
						game,
						gameTitle
					}
				};
			}

			return {
				status: res.status,
				error: new Error('Could not load /games.json')
			};
		} catch (e) {
			return {
				status: 404,
				error: `Game.svelte not found in '/src/games/${page.params.game}'`
			};
		}
	}
</script>

<script lang="ts">
	import SessionWrapper from '$lib/session/SessionWrapper.svelte';
	import WaitingRooms from '$lib/room/components/WaitingRooms.svelte';
	import JoinedRooms from '$lib/room/components/JoinedRooms.svelte';
	import WaitingRoom from '$lib/room/components/WaitingRoom.svelte';
	import { user } from '$lib/session/user';
	import { onMount } from 'svelte';
	import { generateTitle } from '$lib/room/generateTitle';
	import { rooms } from '$lib/room/stores';
	export let Game;
	export let game;
	export let gameTitle;

	let players = [];
	let roomKey;
	let stateIndex = 0;
	let room;
	let state;
	let roomTitle;

	onMount(() => {
		const url = new URL(window.location.href);
		if (url.hash) {
			roomKey = url.hash.substring(1);
		}
	});

	$: if (roomKey) {
		room = rooms.get(roomKey);
	}

	$: if (room) {
		room.subscribe((updatedRoom) => {
			roomTitle = updatedRoom.title;
			stateIndex = updatedRoom.stateIndex;
			state = updatedRoom.state ? JSON.parse(updatedRoom.state) : {};
		});
		room.players((p) => (players = p));
	}

	// Add User to room
	$: if (room && stateIndex === 0 && $user.alias) {
		room.addPlayer($user);
	}

	function createGame() {
		const url = new URL(window.location.href);
		const title = generateTitle();
		roomKey = rooms.create(game, title);
		url.hash = roomKey;
		window.location.replace(url.href);
	}

	function enterRoom(event) {
		const url = new URL(window.location.href);
		roomKey = event.detail.room;
		url.hash = roomKey;
		window.location.replace(url.href);
	}

	function handleStartGame() {
		room.publishState({});
	}
</script>

<svelte:head>
	<title>{gameTitle}{roomTitle ? ` [${roomTitle}]` : ''}</title>
</svelte:head>

<SessionWrapper>
	{#if room && stateIndex > 0}
		<svelte:component
			this={Game}
			room={{
				init: stateIndex === 1,
				players,
				sessionPlayer: $user,
				publishState: room.publishState
			}}
			{state}
		/>
	{:else if room && stateIndex === 0}
		<h2 class="mb-5 text-3xl text-purple-900 font-bold text-center capitalize">
			{gameTitle}<br />[{roomTitle}]
		</h2>
		<WaitingRoom {players} on:startGame={handleStartGame} />
	{:else}
		<h2 class="mb-5 text-3xl text-purple-900 font-bold text-center capitalize">{gameTitle}</h2>
		<div class="px-5">
			<button on:click={createGame}>Create Game</button>
		</div>
		<JoinedRooms on:click={enterRoom} {game} player={$user} />
		<br />
		<WaitingRooms on:click={enterRoom} {game} />
	{/if}
</SessionWrapper>
