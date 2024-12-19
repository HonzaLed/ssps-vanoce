<script lang="ts">
    import QrScanner from "$lib/components/QrScanner.svelte";
</script>

<QrScanner on:on:qrScanned={console.log}/>