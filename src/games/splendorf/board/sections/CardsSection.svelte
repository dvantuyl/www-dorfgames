<script>
	import Row from '../components/Row.svelte';
	export let game;
</script>

<div class="w-full h-full bg-red-400 grid grid-cols-5 gap-1 sm:gap-5">
	<Row index={2} {game} />
	<Row index={1} {game} />
	<Row index={0} {game} />
</div>
