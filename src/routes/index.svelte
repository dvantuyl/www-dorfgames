<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/games.json');

		if (res.ok) {
			return {
				props: {
					games: await res.json()
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
	<title>Dorfgames</title>
</svelte:head>

<section class="w-full h-full flex justify-center items-center">
	<h1 class="text-3xl bold text-green-600">You've Dorfed and gone to Dorf!!</h1>
</section>

<div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4">
	{#each games as game}
		<a
			class="block rounded bg-green-400 text-green-900 font-bold text-2xl text-center capitalize p-4"
			href="/games/{game}">{game}</a
		>
	{/each}
</div>
