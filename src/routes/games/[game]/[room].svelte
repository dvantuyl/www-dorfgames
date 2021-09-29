<script context="module">
	export async function load({ page }) {
		try {
			const Game = await import(`../../../lib/games/${page.params.game}/main.svelte`);

			return {
				props: {
					Game: Game.default,
					game: page.params.game,
					room: page.params.room
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
	import array from 'lodash/array.js';
	import { username, db, user } from '$lib/session/user';
	import { onMount } from 'svelte';
	export let Game;
	export let game;
	export let room;

	let sessionUserId;
	let title;
	let state = { i: 0 };
	let users = [];

	onMount(() => {
		db.get(game)
			.get(room)
			.get('players')
			.map()
			.on((data) => {
				if (data && data.alias) {
					const usersList = array.uniq([...users, data.alias]);
					if (users.length < usersList.length) {
						users = usersList;
						console.log('updateusers', users);
					}
				}
			});

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

	$: if ($username) {
		sessionUserId = $username;
		db.get(game).get(room).get('players').set(user);
	}

	$: if (state && Object.values(state).length) {
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
