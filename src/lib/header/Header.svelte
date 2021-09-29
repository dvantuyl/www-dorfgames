<script>
	import { username, user } from '$lib/session/user';
	import { variables } from '$lib/variables';

	function signout() {
		user.leave();
		username.set('');
	}
</script>

<header class="flex justify-between items-center h-20 w-full">
	{#if $username}
		<div class="flex">
			<span><strong>{$username}</strong></span>
			<img src={`https://avatars.dicebear.com/api/initials/${$username}.svg`} alt="avatar" />
		</div>

		<button class="signout-button" on:click={signout}>Sign Out</button>
	{:else}
		<span><strong>Sign In</strong></span>
		<span>{variables.gunServer}</span>
	{/if}
	<slot />
</header>
