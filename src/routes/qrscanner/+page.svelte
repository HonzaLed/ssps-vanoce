<script lang="ts">
	import { goto } from '$app/navigation';
	import QrScanner from '$lib/components/QrScanner.svelte';

	const regex = new RegExp(/https:\/\/vanoce\.robincloud\.xyz\/qr\/\w{8}(-\w{4}){3}-\w{12}/);

	function qrScanned(event: { data: string }) {
		const url = event.data;
		console.log(url);
		if (regex.test(url)) {
			goto(url.replace('https://vanoce.robincloud.xyz', ''));
		} else {
			alert('Invalid QR code');
		}
	}
</script>

<div class="m-8 flex flex-col gap-4">
    <h1 class="text-glow text-3xl text-center">Scan a QR Code</h1>
	<QrScanner onQrScanned={qrScanned} className="rounded-xl" />
</div>
