<script lang="ts">
	export let role: string;
	let roles = role.split('');
</script>

<h1 class="text-glow font-bold">
	{#each roles as role}
		<span>{role}</span>
	{/each}
</h1>

<style>
    :root {
        --duration: 1s;
    }
	* {
		padding: 0;
		margin: 0;
	}

	body {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	h1 {
		text-align: center;
		transform: scale(0.94);
		animation: scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1);
	}
	@keyframes scale {
		100% {
			transform: scale(1);
		}
	}

	span {
		display: inline-block;
		opacity: 0;
		filter: blur(4px);
	}

	span:nth-child(1) {
		animation: fade-in var(--duration) 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(2) {
		animation: fade-in var(--duration) 0.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(3) {
		animation: fade-in var(--duration) 0.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(4) {
		animation: fade-in var(--duration) 0.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(5) {
		animation: fade-in var(--duration) 0.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(6) {
		animation: fade-in var(--duration) 0.6s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(7) {
		animation: fade-in var(--duration) 0.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(8) {
		animation: fade-in var(--duration) var(--duration) forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(9) {
		animation: fade-in var(--duration) 0.9s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(10) {
		animation: fade-in var(--duration) 1s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(11) {
		animation: fade-in var(--duration) 1.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(12) {
		animation: fade-in var(--duration) 1.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(13) {
		animation: fade-in var(--duration) 1.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(14) {
		animation: fade-in var(--duration) 1.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(15) {
		animation: fade-in var(--duration) 1.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(16) {
		animation: fade-in var(--duration) 1.6s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(17) {
		animation: fade-in var(--duration) 1.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	span:nth-child(18) {
		animation: fade-in var(--duration) 1.8s forwards cubic-bezier(0.11, 0, 0.5, 0);
	}

	@keyframes fade-in {
		100% {
			opacity: 1;
			filter: blur(0);
		}
	}
</style>
