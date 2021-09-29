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

<ul>
	{#each games as game}
		<li><a class="capitalize underline" href="/games/{game}">{game}</a></li>
	{/each}
</ul>
