<script>
	import { user, username } from './user';

	let un;
	let pw;

	function login() {
		user.auth(un, pw, ({ err }) => err && alert(err));
	}

	function signup() {
		user.create(un, pw, ({ err }) => {
			if (err) {
				alert(err);
			} else {
				login();
			}
		});
	}
</script>

{#if $username}
	<slot />
{:else}
	<label for="username">Username</label>
	<input name="username" bind:value={un} minlength="3" maxlength="16" />

	<label for="password">Password</label>
	<input name="password" bind:value={pw} type="password" />

	<button class="login" on:click={login}>Login</button>
	<button class="login" on:click={signup}>Sign Up</button>
{/if}
