<script lang="ts">
	import { register, type Register } from '$lib/api';
	import { onMount } from 'svelte';
	import { state } from '$lib/state';
	import type Result from '$lib/result';
	import RoleReveal from '$lib/components/RoleReveal.svelte';
	import { goto } from '$app/navigation';
	import autoAnimate from '@formkit/auto-animate';

	enum PageState {
		LOADING,
		SUCCESS,
		ERROR
	}
	let pageState: PageState = PageState.LOADING;
	let error: string | null = null;
	let roleDescription: string | null = null;
	let showButtons: boolean = false;

	onMount(async () => {
		if ($state.username == null || $state.email == null) {
			pageState = PageState.ERROR;
			error = 'Username or email not provided';
			// goto("/");
			return;
		}

		const reg = await register($state.username, $state.email);
		if (reg.isErr()) {
			error = reg.unwrapErr()!;
			pageState = PageState.ERROR;
			return;
		}
		let res = reg.unwrap()!;
		console.log(res);
		$state.role = res.role;
		$state.team = res.team!;
		$state.loggedIn = true;
		// setTimeout(() => {
		// 	// TODO: Fetch role description
		// 	roleDescription = `You're a <role>, your task is to.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse nisl. Aliquam erat volutpat. Phasellus et lorem id felis nonummy placerat. Etiam commodo dui eget wisi. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Nullam sit amet magna in magna gravida vehicula. Aliquam ornare wisi eu metus. Vestibulum fermentum tortor id mi. Integer malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Phasellus et lorem id felis nonummy placerat. Aliquam erat volutpat. Donec quis nibh at felis congue commodo. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Etiam quis quam. Aliquam erat volutpat. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede.`; //res.role_description;
		// }, 3000);
		setTimeout(() => {
			showButtons = true;
		}, 3000);
		pageState = PageState.SUCCESS;
	});
</script>

<div class="text-3xl text-center w-screen">
	{#if pageState == PageState.SUCCESS}
		<div class="flex flex-col gap-4 justify-center items-center" use:autoAnimate>
			<p>Your role is <RoleReveal role={$state.role! === "runner" ? "Konstáblo" : "Detektiv"} /></p>
			{#if roleDescription != null}
				<p class="lg:mx-48 mt-12 text-2xl">{roleDescription}</p>
			{/if}
			{#if showButtons}
				<div class="flex gap-4">
					<button
						class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent shadow-button text-lg"
						on:click={() => goto('/sdvjndsakjsdvkj')}>Rewatch the video</button
					>
					<button
						class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent shadow-button text-lg"
						on:click={() => goto('/dashboard')}>Continue to dashboard</button
					>
				</div>
			{/if}
		</div>
	{:else if pageState == PageState.ERROR}
		<div class="flex flex-col gap-4 justify-center items-center">
			<p class="text-glow">Error: {error}</p>
			<button
				class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow text-lg"
				on:click={() => goto('/')}>Restart</button
			>
		</div>
	{/if}
</div>
