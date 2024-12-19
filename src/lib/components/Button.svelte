<script lang="ts">
	import { goto } from '$app/navigation';

	export let href: string;

	function onClick(event: MouseEvent) {
		goto(href);
	}
</script>

<button
	class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56"
	on:click={onClick}
>
	<slot />
</button>
