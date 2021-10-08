<script>
	import { rooms } from '$lib/stores';
	import { onDestroy } from 'svelte';
	export let key;
	export let title;

	let users = [];

	onDestroy(() => ref.off());

	const ref = rooms.get(key).users((roomUsers) => {
		users = Object.values(roomUsers);
	});
</script>

<div class="rounded bg-purple-400 p-2 flex flex-col cursor-pointer mb-4 last:mb-0 h-full" on:click>
	<h4 class="text-lg font-bold text-center capitalize mb-2 text-purple-900">
		{title ? title : key}
	</h4>
	{#if users.length}
		<div class="bg-purple-200 rounded p-2 h-full">
			{#each users as user}
				<span class="text-lg block text-purple-900 font-medium">{user.alias}</span>
			{/each}
		</div>
	{/if}
</div>
