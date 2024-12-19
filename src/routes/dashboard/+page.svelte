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

{#if $state.role === "runner"}
    <RunnerDashboard />
{:else if $state.role === "solver"}
    <SolverDashboard />
{:else}
    <h1 class="text-white text-center text-6xl">Unknown role</h1>
{/if}
