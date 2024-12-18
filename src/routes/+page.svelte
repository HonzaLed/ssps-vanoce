<script lang="ts">
	import { createAnimationTriggerAction } from 'svelte-trigger-action';
	import { tick } from 'svelte';
	import Video from '$lib/Video.svelte';
	import { state } from '$lib/state';

	const usernameAnimation = createAnimationTriggerAction();

	let displayed_username: string | null = null;
	let showUsername: boolean = true;

	let playVideo = () => {};

	async function onKeyPress(event: KeyboardEvent) {
		if (displayed_username !== null) return;
		if (event.key === 'Enter') {
			displayed_username = (event.target as HTMLInputElement)?.value;
			$state.username = displayed_username;
			await tick();
			usernameAnimation.triggerAnimation('send');
		}
	}
</script>

<svelte:head>
	<link rel="preload" href="/video.mp4" as="video" />
</svelte:head>

<div class="h-screen w-screen flex flex-col justify-center items-center custom-background">
	<!-- <button use:animationAction on:click={() => triggerAnimation('send')}> shake me </button> -->
	{#if displayed_username === null}
		<input
			type="text"
			class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56"
			placeholder="Enter your username"
			on:keypress={onKeyPress}
		/>
	{:else if showUsername}
		<div
			class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56 text-ellipsis overflow-hidden"
			use:usernameAnimation.animationAction
			on:animationend={async () => {
				showUsername = false;
				playVideo();
			}}
		>
			{displayed_username}
		</div>
	{:else}
		<div class="text-gray-200 mb-6 text-glow">You are currently logged in as <b>{displayed_username}</b></div>
	{/if}

	<Video visible={displayed_username != null && !showUsername} bind:restartVideo={playVideo} href="/next" />
</div>

<style>
	:global(.video-appear) {
		animation: video 1.7s ease-out both;
		backface-visibility: hidden;
		perspective: 1000px;
	}
	@keyframes video-appear {
		0% {
			transform: translateY(50rem);
		}
		100% {
			transform: translateY(0);
		}
	}

	:global(.send) {
		animation: send 1.7s cubic-bezier(0.68, -0.55, 0.165, 2) both;
		backface-visibility: hidden;
		perspective: 1000px;
	}

	@keyframes send {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-50rem);
		}
	}
</style>
