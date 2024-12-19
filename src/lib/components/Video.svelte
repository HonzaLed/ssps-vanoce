<script lang="ts">
	import { goto } from '$app/navigation';
	import autoAnimate from '@formkit/auto-animate';
	import { onMount } from 'svelte';

	export let visible: boolean = true;
	export let href: string;
	export let replayable: boolean = true;
	export let autoRedirect: boolean = false;
	export let controls: boolean = true;

	let videoElement: HTMLVideoElement;
	let videoEnded: boolean = false;

	export const restartVideo = () => {
		videoElement.currentTime = 0;
		videoElement.muted = false;
		videoElement.play();
	};

	onMount(() => {
		videoElement.play();
	});
</script>

<div use:autoAnimate={{ duration: 500, easing: 'ease-in-out' }} class:hidden={!visible}>
	<div class="rounded-xl video-container">
		<!-- svelte-ignore a11y_media_has_caption -->
		<video
			src="/video.mp4"
			autoplay
			preload="auto"
			{controls}
			muted
			class="rounded-xl custom-shadow"
			bind:this={videoElement}
			on:ended={() => {
				videoEnded = true;
				if (autoRedirect) goto(href);
			}}
		></video>
	</div>
	{#if videoEnded && !autoRedirect}
		<div class="flex items-center justify-center pt-8 gap-8">
			{#if replayable}
				<button
					class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent shadow-button"
					on:click={(/*, videoEnded = false*/) => (
						(videoElement.currentTime = 0), videoElement.play()
					)}
				>
					Replay <i class="fa-solid fa-arrow-rotate-left"></i></button
				>
			{/if}
			<button
				class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent shadow-button"
				on:click={() => goto(href)}>Next <i class="fa-solid fa-arrow-right"></i></button
			>
		</div>
	{/if}
</div>

<style>
	.video-container {
		transition: all 0.5s;
		-webkit-transition: -webkit-flex 500ms ease-in-out;
	}
</style>
