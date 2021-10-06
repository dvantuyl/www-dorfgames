<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/games.json');

		if (res.ok) {
			const gameMap = await res.json();
			const games = Object.entries(gameMap).reduce(
				(entries, [key, title]) => [...entries, { key, title }],
				[]
			);

			return {
				props: {
					games
				}
			};
		}

		return {
			status: res.status,
			error: new Error('Could not load /games.json')
		};
	}
</script>

<script>
	export let games = [];
</script>

<svelte:head>
	<title>Games | Dorfgames</title>
</svelte:head>

<section class="w-full h-full grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4">
	{#each games as game}
		<a
			class="block rounded bg-green-400 text-green-900 font-bold text-2xl text-center capitalize p-4"
			href="/games/{game.key}">{game.title}</a
		>
	{/each}
</section>
