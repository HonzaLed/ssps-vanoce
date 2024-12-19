<script>
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { onMount } from 'svelte';
	import { state } from '$lib/state';
	import { browser } from "$app/environment";
	import { getTeamInfo } from '$lib/api';

	async function refreshTeam() {
		console.log("Refreshing team...");
		const team_info_r = await getTeamInfo();
		if (team_info_r.isErr()) {
			console.error(team_info_r.unwrapErr());
			return;
		}
		const team = team_info_r.unwrap();
		if (!team) {
			console.error("Failed to unwrap team info");
			return;
		}
		$state.team = team.team;
		setTimeout(refreshTeam, 5000);
	}

	onMount(() => {
		if (!browser) {return;}
		console.log("Running on browser");
		const stored_team = localStorage.getItem('team');
		if (stored_team != null) {
			$state.team = JSON.parse(stored_team);
			refreshTeam();
		}
	});

	onMount(() => {
		refreshTeam();
	});
</script>

{#if $state.team != null}
	<div class="absolute top-0 right-0 text-gray-200 pt-2 pr-4 text-xl">
		Your team is {$state.team.number}<br>
		Score: {$state.team.score}
	</div>
{/if}
<div class="h-dvh w-screen flex flex-col justify-center items-center custom-background text-white">
	<slot />
</div>

<style>
	:global(:root) {
		--color-outer-s: rgb(10, 25, 52);
		--color-inner-s: rgb(45, 97, 105);
		/* --color-inner-s: rgb(215,32,32);
        --color-outer-s: rgba(67,135,16,1); */

		--color-outer: hsl(from var(--color-outer-s) h s calc(l - 10));
		--color-inner: hsl(from var(--color-inner-s) h s calc(l - 10));
	}

	:global(.custom-background) {
		background: var(--color-inner);
		background: radial-gradient(circle, var(--color-inner) 0%, var(--color-outer) 100%);
	}

	:global(.custom-shadow) {
		--color-inner-lighter: hsl(from var(--color-inner) h calc(s + 2) calc(l + 12));
		--color-inner-lighter-opacity: hsl(from var(--color-inner-lighter) h s l / 40%);
		/* box-shadow: 0px 0px 32px 6px rgba(36,140,156,1), inset 0px 0px 20px 20px rgba(36,140,156,0.4); */
		box-shadow:
			0px 0px 32px 6px var(--color-inner-lighter),
			inset 0px 0px 20px 20px var(--color-inner-lighter-opacity);
	}

	:global(.custom-glow) {
		--color-glow: hsl(from var(--color-inner) h calc(s + 2) calc(l + 12));
		box-shadow: 0px 0px 32px 6px var(--color-glow);
	}

	:global(.text-glow) {
		--color-glow: hsl(from var(--color-inner) h calc(s + 2) calc(l + 50));
		text-shadow: 0px 0px 17px #fff; /*var(--color-glow)*/
	}

	:global(shadow-button) {
		--color-inner-lighter: hsl(from var(--color-inner) h calc(s + 2) calc(l + 12));
		--color-inner-lighter-opacity: hsl(from var(--color-inner-lighter) h s l / 40%);
		box-shadow:
			0px 0px 16px 3px var(--color-inner-lighter),
			inset 0px 0px 20px 20px var(--color-inner-lighter-opacity);
	}
	:global(.shadow-button:hover) {
		--color-inner-lighter: hsl(from var(--color-inner) h calc(s + 2) calc(l + 12));
		--color-button-lighter: hsl(from var(--color-inner) h calc(s + 2) calc(l + 32) / 40%);
		box-shadow:
			0px 0px 16px 3px var(--color-inner-lighter),
			inset 0px 0px 20px 20px var(--color-button-lighter);
	}
</style>
