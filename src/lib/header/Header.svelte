<script>
	import Breadcrumbs from './Breadcrumbs.svelte';
	import SessionUser from './SessionUser.svelte';
</script>

<div class="flex justify-between items-center h-full w-full">
	<Breadcrumbs />

	<div class="flex gap-2 divide-x-2 divide-green-500 items-center">
		<div><a href="/games" class="font-semibold">Games</a></div>
		<SessionUser />
	</div>

	<slot />
</div>
