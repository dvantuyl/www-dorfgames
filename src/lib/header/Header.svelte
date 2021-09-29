<script>
	import { username, user } from '$lib/session/user';

	function signout() {
		user.leave();
		username.set('');
	}
</script>

<div class="flex justify-between items-center h-full w-full">
	<div class="flex items-bottom">
		<h1 class="text-xl font-bold"><a href="/">Dorfgames.com</a></h1>
		<div class="divide-x divide-green-500 flex items-center ml-5">
			<span class="block"><a href="/games">Games</a></span>
		</div>
	</div>

	{#if $username}
		<div class="flex items-center">
			<span class="font-bold block mr-2">{$username}</span>
			<img
				class="block w-10 mr-5"
				src={`https://avatars.dicebear.com/api/initials/${$username}.svg`}
				alt="avatar"
			/>
			<button class="signout-button block" on:click={signout}>Sign Out</button>
		</div>
	{:else}
		<span>Sign In</span>
	{/if}
	<slot />
</div>
