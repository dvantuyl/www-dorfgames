<script context="module">
	export async function load({ page }) {
		try {
			const Game = await import(`../../../games/${page.params.game}/Game.svelte`);

			return {
				props: {
					Game: Game.default,
					game: page.params.game
				}
			};
		} catch (e) {
			return {
				status: 404,
				error: `Game '${page.params.game}' not found`
			};
		}
	}
</script>

<script>
	import SessionWrapper from '$lib/session/SessionWrapper.svelte';
	import RoomIndex from '$lib/room/components/RoomIndex.svelte';
	import RoomPlayers from '$lib/room/components/RoomPlayers.svelte';
	import { db, user } from '$lib/session/user';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { waitingRooms, roomUsers, roomState } from '$lib/room';
	export let Game;
	export let game;

	let sessionUserId;
	let state;
	let users;
	let room;
	let stateIndex = 0;
	let waitingRoomList = [];

	onMount(() => {
		const url = new URL(window.location.href);
		if (url.hash) {
			room = url.hash.substring(1);
		}
	});

	// Subscribe to room users
	$: if (game && room && stateIndex === 0) {
		roomUsers(game, room, (updatedUsers) => {
			users = updatedUsers;
		});
	}

	// Subscribe to room state
	$: if (game && room) {
		roomState(game, room, (nextStateIndex, updatedState) => {
			stateIndex = nextStateIndex;
			state = updatedState;
		});
	}

	$: if (game && !room) {
		waitingRooms(game, (updatedRooms) => {
			waitingRoomList = updatedRooms;
		});
	}

	// Add User to room
	$: if (room && $user.alias) {
		sessionUserId = $user.uuid;
		db.get(game).get(room).get('players').set($user);
	}

	function createGame() {
		const url = new URL(window.location.href);
		room = uuidv4();
		url.hash = room;
		window.location.replace(url.href);
	}

	function enterRoom(event) {
		const url = new URL(window.location.href);
		room = event.detail.room;
		url.hash = room;
		window.location.replace(url.href);
	}

	function startGame() {
		stateIndex = 1;
	}
</script>

<svelte:head>
	<title>{game}</title>
</svelte:head>

<SessionWrapper>
	{#if stateIndex > 0}
		<svelte:component
			this={Game}
			ctx={{ stateIndex, game, room }}
			{users}
			{sessionUserId}
			{state}
		/>
	{:else if room && stateIndex === 0}
		<div class="px-5">
			<button on:click={startGame}>Start Game</button>
			<div class="flex flex-col bg-red-300 p-4">
				<RoomPlayers {game} {room} innerClass="block text-lg mb-2 last:mb-0" />
			</div>
		</div>
	{:else}
		<div class="px-5">
			<button on:click={createGame}>Create Game</button>
		</div>
		<RoomIndex on:click={enterRoom} title="Waiting Rooms" rooms={waitingRoomList} {game} />
	{/if}
</SessionWrapper>
