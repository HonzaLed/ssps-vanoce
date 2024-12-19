<!-- HERE QR HANDELER -->
<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { getQR } from '$lib/api';
    import { state } from '$lib/state';

    let code = $page.params.code;

    onMount(async () => {
        console.log($state.username);
        console.log($state.team);
        let qr = await getQR(code);
        console.log(qr);
    });
</script>

{code}