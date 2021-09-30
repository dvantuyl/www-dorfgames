<script context="module">
	export async function load({ page }) {
		try {
			const Game = await import(`../../../lib/games/${page.params.game}/Game.svelte`);

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
	import _array from 'lodash/array.js';
	import _object from 'lodash/object.js';
	import { db, user } from '$lib/session/user';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	export let Game;
	export let game;

	let sessionUserId;
	let title;
	let state = { i: 0 };
	let users = [];
	let room;

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

		// Subscribe users added to room
		db.get(game)
			.get(room)
			.get('players')
			.map()
			.on((data) => {
				if (data && data.alias) {
					const user = _object.pick(data, ['uuid', 'alias']);
					const usersList = _array.uniqBy([...users, user], 'uuid');
					if (users.length < usersList.length) {
						users = usersList;
						console.log('updateusers', users);
					}
				}
			});

		// Subscribe game state update from another user
		db.get(game)
			.get(room)
			.get('state')
			.on((data) => {
				if (data) {
					const stateUpdate = JSON.parse(data);
					if (stateUpdate.i !== state.i) {
						state = stateUpdate;
						console.log('updatestate', state);
					}
				}
			});
	});

	// Add User to room
	$: if (room && $user.alias) {
		sessionUserId = $user.uuid;
		db.get(game).get(room).get('players').set($user);
	}

	// Publish local game to rest of the users
	$: if (room && state && Object.values(state).length) {
		db.get(game).get(room).get('state').put(JSON.stringify(state));
	}

	function startGame() {
		state = { i: 1 };
	}
</script>

<svelte:head>
	<title>{title || game}</title>
</svelte:head>

<SessionWrapper>
	{#if state.i > 0}
		<svelte:component this={Game} {users} {sessionUserId} bind:state bind:title />
	{:else}
		<main class="px-5">
			<button on:click={startGame}>Start Game</button>
		</main>
	{/if}
</SessionWrapper>
