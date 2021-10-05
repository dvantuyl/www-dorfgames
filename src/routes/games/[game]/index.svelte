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

<script lang="ts">
	import SessionWrapper from '$lib/session/SessionWrapper.svelte';
	import RoomIndex from '$lib/room/components/RoomIndex.svelte';
	import RoomPlayers from '$lib/room/components/RoomPlayers.svelte';
	import { user } from '$lib/session/user';
	import { onMount } from 'svelte';
	//import { joinedRooms, waitingRooms, roomUsers, roomState } from '$lib/room';
	import { rooms } from '$lib/room/stores';
	export let Game;
	export let game;

	let players = [];
	let roomKey;
	let room;

	onMount(() => {
		const url = new URL(window.location.href);
		if (url.hash) {
			roomKey = url.hash.substring(1);
		}
	});

	$: if (roomKey) {
		rooms.room(roomKey).subscribe((r) => (room = r));
		rooms.room(roomKey).players((p) => (players = p));
	}

	// Add User to room
	$: if (roomKey && $user.alias) {
		rooms.room(roomKey).addPlayer($user);
	}

	function createGame() {
		const url = new URL(window.location.href);
		roomKey = rooms.create(game);
		url.hash = roomKey;
		window.location.replace(url.href);
	}

	function enterRoom(event) {
		const url = new URL(window.location.href);
		roomKey = event.detail.room;
		url.hash = roomKey;
		window.location.replace(url.href);
	}

	function startGame() {
		rooms.room(roomKey).publishState({});
	}
</script>

<svelte:head>
	<title>{game}</title>
</svelte:head>

<SessionWrapper>
	{#if room && room.stateIndex > 0}
		<svelte:component
			this={Game}
			room={{
				init: room.stateIndex === 1,
				players,
				sessionPlayer: $user,
				publishState: rooms.room(roomKey).publishState
			}}
			state={JSON.parse(room.state)}
		/>
	{:else if room && room.stateIndex === 0}
		<div class="px-5">
			<button on:click={startGame}>Start Game</button>
			<div class="flex flex-col bg-red-300 p-4">
				<!-- <RoomPlayers {game} {room} innerClass="block text-lg mb-2 last:mb-0" /> -->
			</div>
		</div>
	{:else}
		<div class="px-5">
			<button on:click={createGame}>Create Game</button>
		</div>
		<!-- <RoomIndex on:click={enterRoom} title="Joined Rooms" rooms={joinedRoomList} {game} />
		<RoomIndex on:click={enterRoom} title="Waiting Rooms" rooms={waitingRoomList} {game} /> -->
	{/if}
</SessionWrapper>
