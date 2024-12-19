<script lang="ts">
	import RunnerDashboard from "$lib/components/dashboards/RunnerDashboard.svelte";
	import SolverDashboard from "$lib/components/dashboards/SolverDashboard.svelte";

    import { state } from "$lib/state";
	import { onMount } from "svelte";

    onMount(() => {
        if (!$state.loggedIn) {
            window.location.href = "/";
        }
    });
</script>

<style>
    .text-glow {
        color: white; /* Text color */
        text-shadow: 0 0 5px white, 0 0 10px white, 0 0 15px white; /* Glowing effect */
        font-size: xx-large;
        text-align: center; /* Center the text */
    }
</style>

{#if $state.role === "runner"}
    <SolverDashboard />
    <!-- <RunnerDashboard /> -->
{:else if $state.role === "solver"}
    <SolverDashboard />
{:else}
    <h1 class="text-glow">Your Role: Unknown</h1>
{/if}
<button on:click={() => window.location.href = "/qrscanner"} class="align-middle items-center text-glow">QR Scanner</button>
