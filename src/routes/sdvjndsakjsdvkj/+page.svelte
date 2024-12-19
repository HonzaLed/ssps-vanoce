<script lang="ts">
	import Video from '$lib/components/Video.svelte';
	import { state } from '$lib/state';
</script>

<div class="w-1/2">
	{#if $state.loggedIn}
		<Video
			visible={true}
			href="/dashboard"
			replayable={true}
			autoRedirect={false}
			controls={true}
		/>
	{:else}
		<Video visible={true} href="/register" replayable={false} autoRedirect={true} controls={true} />
	{/if}
</div>
