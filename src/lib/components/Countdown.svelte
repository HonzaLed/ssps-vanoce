<script lang="ts">
	export let time: Date;
</script>

<div class="grid auto-cols-max grid-flow-col gap-8 text-center flex-grow-0">
	<div class="flex flex-col">
		<span class="countdown font-mono text-7xl text-custom">
			<span style="--value:{time.getHours()};"></span>
		</span>
		<span class="text-glow text-custom text-lg"> hours </span>
	</div>
	<div class="flex flex-col">
		<span class="countdown font-mono text-7xl text-custom">
			<span style="--value:{time.getMinutes()};"></span>
		</span>
		<span class="text-glow text-custom text-lg"> min </span>
	</div>
	<div class="flex flex-col">
		<span class="countdown font-mono text-7xl text-custom">
			<span style="--value:{time.getSeconds()};"></span>
		</span>
		<span class="text-glow text-custom text-lg"> sec </span>
	</div>
</div>

<style>
	.text-custom {
		font-weight: bold;
	}
</style>
