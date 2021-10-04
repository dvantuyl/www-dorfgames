<script>
	import { roomUsers } from '$lib/room/roomUsers';
	export let game;
	export let room;
	export let innerClass = '';

	let users = [];

	$: if (game && room) {
		roomUsers(game, room, (updatedUsers) => {
			users = updatedUsers;
		});
	}
</script>

{#each users as user}
	<span class={innerClass}>{user.alias}</span>
{/each}
