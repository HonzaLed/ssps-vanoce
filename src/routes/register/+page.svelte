<script lang="ts">
	import { createAnimationTriggerAction } from 'svelte-trigger-action';
	import { tick } from 'svelte';
	import { state } from '$lib/state';
	import { goto } from '$app/navigation';

	const usernameAnimation = createAnimationTriggerAction();

	enum SubmitState {
		FORM,
		STATIC,
		EMPTY,
	}

	let displayed_username: string | null = null;
	let displayed_email: string | null = null;

	let pageState: SubmitState = SubmitState.FORM;
	let temporaryHideStatic: boolean = false;

	async function onSubmit(event: SubmitEvent) {
		console.log(event);
		displayed_username = (
			(event.target as HTMLInputElement)?.querySelector('input[type="text"]') as HTMLInputElement
		)?.value;
		displayed_email = (
			(event.target as HTMLInputElement)?.querySelector('input[type="mail"]') as HTMLInputElement
		)?.value;

		displayed_username = displayed_username.trim();
		displayed_email = displayed_email.trim();

		$state.username = displayed_username;
		$state.email = displayed_email;
		pageState = SubmitState.STATIC;
		await tick();
		usernameAnimation.triggerAnimation('send');
	}

	function onAnimatioEnd() {
		pageState = SubmitState.EMPTY;
		goto('/role');
	}
</script>

<!-- <button use:animationAction on:click={() => triggerAnimation('send')}> shake me </button> -->
{#if pageState == SubmitState.FORM}
	<form method="GET" action="#" on:submit|preventDefault={onSubmit}>
		<div class="flex flex-col gap-4">
			<input
				type="text"
				class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56"
				placeholder="Enter your username"
				required
			/>
			<input
				type="mail"
				class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56"
				placeholder="Enter your school email"
				pattern="[A-Za-z0-9.]+@skola\.ssps\.cz"
				required
			/>
			<button
				class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56"
				>Submit <i class="fa-solid fa-arrow-right"></i></button
			>
		</div>
	</form>
{:else if pageState == SubmitState.STATIC}
	<div class="flex flex-col gap-4" class:hidden={temporaryHideStatic}>
		<div
			class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56 text-ellipsis overflow-hidden"
			use:usernameAnimation.animationAction
			on:animationend={onAnimatioEnd}
		>
			{displayed_username}
		</div>
		<div
			class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56 text-ellipsis overflow-hidden"
			use:usernameAnimation.animationAction
		>
			{displayed_email}
		</div>
	</div>
{:else if pageState == SubmitState.EMPTY}
{/if}

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

	.animated {
		transform: translateY(50rem);
	}

	.animation {
		transition: transform 1.7s cubic-bezier(0.68, -0.55, 0.165, 2);
	}

	:global(.send) {
		animation: send 1.7s cubic-bezier(0.68, -0.55, 0.165, 2) both;
		backface-visibility: hidden;
		perspective: 1000px;
	}

	:global(.send-reverse) {
		animation: send 1.7s cubic-bezier(0.68, -0.55, 0.165, 2) reverse;
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
