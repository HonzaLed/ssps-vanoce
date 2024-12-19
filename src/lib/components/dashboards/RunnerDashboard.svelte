<script lang="ts">
    import { state } from "$lib/state";
    let redirect = () => {
        window.location.href = "/qrscanner";
    };
</script>

<button on:click={() => window.location.href = "/qrscanner"} class="dow-button align-middle items-center text-glow">QR Scanner</button>
