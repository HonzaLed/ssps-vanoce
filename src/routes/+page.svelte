<script lang="ts">
	import autoAnimate from '@formkit/auto-animate';
	import { onMount } from 'svelte';
	import { getEventCountdown } from '$lib/api';
	import Countdown from '$lib/components/Countdown.svelte';
	import { goto } from '$app/navigation';

	let timeLeft: Date | null = null;
	let target: number = 0;

	async function refreshFromServer() {
		let event_r = await getEventCountdown(1734562920);
        if (event_r.isErr()) {
            console.error(event_r.unwrapErr());
            return;
        }
        let event = event_r.unwrap()!;

		if (event.started) {
			goto(event.redirect_url!);
			return;
		}
		target = event.starts_at * 1000;
		timeLeft = new Date(target - Date.now());
		console.log('Callin again in', timeLeft.getTime() / 100);
		setTimeout(refreshFromServer, timeLeft.getTime() / 100);
	}

	async function refreshUI() {
		if (timeLeft === null) return;
		timeLeft = new Date(target - Date.now());
	}

	onMount(() => {
		refreshFromServer();
		setInterval(refreshUI, 500);
	});
</script>

<div class="text-center w-screen flex flex-col justify-center items-center gap-8">
	<p class="text-6xl text-glow">WELCOME TRAVELER</p>
	{#if timeLeft === null}
		<p class="text-4xl text-glow">Loading...</p>
	{:else}
		<div class="m-auto">
			<Countdown time={timeLeft} />
		</div>
	{/if}
</div>
