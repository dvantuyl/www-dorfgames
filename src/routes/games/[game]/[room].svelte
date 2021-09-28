<script context="module">
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
	export let Game;
	export let game;
	export let room;

	let title;
</script>

<svelte:head>
	<title>{title || game}</title>
</svelte:head>

<svelte:component this={Game} {room} bind:title />
