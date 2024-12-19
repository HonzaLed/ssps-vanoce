<script lang="ts">
	import { register, type Register } from '$lib/api';
	import { onMount } from 'svelte';
	import { state } from '$lib/state';
	import type Result from '$lib/result';
	import RoleReveal from '$lib/components/RoleReveal.svelte';
	import Button from '$lib/components/Button.svelte';
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
        setTimeout(() => {
            // TODO: Fetch role description
            roleDescription = `You're a <role>, your task is to.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse nisl. Aliquam erat volutpat. Phasellus et lorem id felis nonummy placerat. Etiam commodo dui eget wisi. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Nullam sit amet magna in magna gravida vehicula. Aliquam ornare wisi eu metus. Vestibulum fermentum tortor id mi. Integer malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Phasellus et lorem id felis nonummy placerat. Aliquam erat volutpat. Donec quis nibh at felis congue commodo. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Etiam quis quam. Aliquam erat volutpat. Duis ante orci, molestie vitae vehicula venenatis, tincidunt ac pede.` //res.role_description;
        }, 5000);
        setTimeout(() => {
            showButtons = true;
        }, 7000);
		pageState = PageState.SUCCESS;
	});
</script>

<div class="text-3xl text-center w-screen" use:autoAnimate>
	{#if pageState == PageState.SUCCESS}
		<p>Your role is <RoleReveal role={$state.role!} /></p>
        {#if roleDescription != null}
            <p class="lg:mx-48 mt-16 text-2xl">{roleDescription}</p>
        {/if}
        {#if showButtons}
            <Button href="/matchmaking">Continue</Button>
        {/if}
	{:else if pageState == PageState.ERROR}
		<div class="flex flex-col gap-4 justify-center items-center">
			<p class="text-glow">Error: {error}</p>
			<Button href="/">Restart</Button>
		</div>
	{/if}
</div>
