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
	import { db, user } from '$lib/session/user';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { roomUsers, roomState } from '$lib/room';
	export let Game;
	export let game;

	let sessionUserId;
	let state;
	let users;
	let room;
	let stateIndex = 0;

	onMount(() => {
		// Create Room
		const url = new URL(window.location.href);
		if (url.hash) {
			room = url.hash.substring(1);
		} else {
			room = uuidv4();
			url.hash = room;
			window.location.replace(url.href);
		}
	});

	// Subscribe to room users
	$: if (game && room) {
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

	// Add User to room
	$: if (room && $user.alias) {
		sessionUserId = $user.uuid;
		db.get(game).get(room).get('players').set($user);
	}

	function startGame() {
		stateIndex = 1;
	}
</script>

<svelte:head>
	<title>{game}</title>
</svelte:head>

<SessionWrapper>
	{#if stateIndex}
		<svelte:component
			this={Game}
			{users}
			{sessionUserId}
			{state}
			ctx={{ stateIndex, game, room }}
		/>
	{:else}
		<main class="px-5">
			<button on:click={startGame}>Start Game</button>
		</main>
	{/if}
</SessionWrapper>
