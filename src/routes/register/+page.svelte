<script lang="ts">
	import { createAnimationTriggerAction } from 'svelte-trigger-action';
	import { tick } from 'svelte';
	import Video from '$lib/Video.svelte';
	import { state } from '$lib/state';

	const usernameAnimation = createAnimationTriggerAction();

	let displayed_username: string | null = null;
	let displayed_email: string | null = null;

	let showUsername: boolean = true;

	async function onKeyPress(event: KeyboardEvent) {
		if (displayed_username !== null) return;
		if (event.key === 'Enter') {
			displayed_username = (
				(event.target as HTMLInputElement)?.parentElement?.querySelector(
					'input[type="text"]'
				) as HTMLInputElement
			)?.value;
			displayed_email = (
				(event.target as HTMLInputElement)?.parentElement?.querySelector(
					'input[type="mail"]'
				) as HTMLInputElement
			)?.value;
			
			displayed_username = displayed_username.trim();
			displayed_email = displayed_email.trim();
            if (false) {} // TODO: validate email using regex

			$state.username = displayed_username;
			$state.email = displayed_email;
			await tick();
			usernameAnimation.triggerAnimation('send');
		}
	}
</script>

<svelte:head>
	<link rel="preload" href="/video.mp4" as="video" />
</svelte:head>

<!-- <button use:animationAction on:click={() => triggerAnimation('send')}> shake me </button> -->
{#if displayed_username === null}
<form method="GET" action="#">
	<input
		type="text"
		class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56"
		placeholder="Enter your username"
		on:keypress={onKeyPress}
		required
	/>
	<input
		type="mail"
		class="border-2 border-gray-300 text-white p-3 mt-4 rounded-xl bg-transparent custom-shadow w-56"
		placeholder="Enter your school email"
		pattern="[A-Za-z0-9]+@skola\.ssps\.cz"
		on:keypress={onKeyPress}
		required
	/>
</form>
{:else if showUsername}
	<div
		class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56 text-ellipsis overflow-hidden"
		use:usernameAnimation.animationAction
		on:animationend={async () => {
			showUsername = false;
		}}
	>
		{displayed_username}
	</div>
	<div
		class="border-2 border-gray-300 text-white p-3 mt-4 rounded-xl bg-transparent custom-shadow w-56"
		use:usernameAnimation.animationAction
	>
		{displayed_email}
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
