<script>
	import Card from '../components/Card.svelte';
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div
	class="fixed z-10 inset-0 overflow-y-auto"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div
		class="flex items-center sm:items-end justify-center min-h-screen py-4 px-4 text-center sm:block sm:p-0"
	>
		<!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

		<!-- This element is to trick the browser into centering the modal contents. -->
		<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
			>&#8203;</span
		>

		<!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
		<div
			class="inline-block rounded-lg  overflow-hidden shadow-xl transform transition-all align-middle sm:max-w-sm w-full"
		>
			<Card clr="gr" pts="4" cost={{ re: 2, gr: 1, bl: 4, bk: 5, wh: 2 }} />
		</div>
	</div>
</div>
