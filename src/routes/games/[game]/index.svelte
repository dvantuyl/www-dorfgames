<script context="module">
	import { v4 as uuidv4 } from 'uuid';
	export const prerender = true;

	export async function load({ page }) {
		const redirect = `/games/${page.params.game}/${uuidv4()}`;

		return {
			status: 302,
			redirect
		};
	}
</script>
