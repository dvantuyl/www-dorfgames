<script context="module">
	import SessionWrapper from '$lib/session/SessionWrapper.svelte';
	export async function load({ page }) {
		try {
			const Game = await import(`../../../games/${page.params.game}/main.svelte`);

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
	import array from 'lodash/array';
	import { username, db, user } from '$lib/session/user';
	import { onMount } from 'svelte';
	export let Game;
	export let game;
	export let room;

	let title;
	let state;
	let players = [];

	$: if ($username) {
		players = array.uniq([...players, $username]);
		db.get(game).get(room).get('players').set(user);
	}

	onMount(() => {
		db.get(game)
			.get(room)
			.get('players')
			.map()
			.on((data) => {
				if (data && data.alias) {
					players = array.uniq([...players, data.alias]);
				}
			});

		db.get(game)
			.get(room)
			.get('state')
			.on((data) => {
				if (data) {
					state = data;
				}
			});
	});

	function startGame() {
		db.get(game).get(room).get('state').put('started');
	}
</script>

<svelte:head>
	<title>{title || game}</title>
</svelte:head>

<SessionWrapper>
	{#if state === 'started'}
		<svelte:component this={Game} {room} {players} bind:title />
	{:else}
		<button on:click={startGame}>Start Game</button>
	{/if}
</SessionWrapper>
