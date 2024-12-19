<!-- HERE QR HANDELER -->
<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { answerQrCode, getQr, getQrInfo, type QrCode, type QrInfo } from '$lib/api';
	import { state } from '$lib/state';

	enum PageState {
		LOADING,
		ERROR,
		SUCCESS,
		ANSWER_ERROR,
		ANSWER_CORRECT
	}

	let pageState: PageState = PageState.LOADING;

	let code = $page.params.code;
	let qr: QrInfo | null = null;
	let error: string | null = null;

	onMount(async () => {
		console.log($state.username);
		console.log($state.team);
		let qr_r = await getQr(code);
		if (qr_r.isErr()) {
			error = qr_r.unwrapErr()!;
			pageState = PageState.ERROR;
			return;
		}
		let qr_info = qr_r.unwrap()! as QrCode;

		let qr_info_r = await getQrInfo(qr_info.task_group!);
		if (qr_info_r.isErr()) {
			error = qr_info_r.unwrapErr()!;
			pageState = PageState.ERROR;
			return;
		}

		qr = qr_info_r.unwrap()!;
		console.log(qr);
		pageState = PageState.SUCCESS;
	});

	async function onSubmit(event: SubmitEvent) {
		let answer = (
			(event.target as HTMLFormElement)?.querySelector('input[type="text"]') as HTMLInputElement
		)?.value;
		let answer_r = await answerQrCode(code, answer, 'scanner');
		console.log(answer_r);
		if (answer_r.isErr()) {
			error = answer_r.unwrapErr()!;
			pageState = PageState.ANSWER_ERROR;
			return;
		}
		if (answer_r.unwrap()!.correct) {
			pageState = PageState.ANSWER_CORRECT;
		} else {
			pageState = PageState.ANSWER_ERROR;
		}
	}
</script>

{#if pageState == PageState.LOADING}
	<div class="text-center w-screen flex flex-col justify-center items-center gap-8">
		<p class="text-6xl text-glow">Loading...</p>
	</div>
{:else if pageState == PageState.ERROR}
	<div class="text-center w-screen flex flex-col justify-center items-center gap-8">
		<p class="text-6xl text-glow">Error</p>
		<p class="text-4xl text-glow">{error}</p>
	</div>
{:else if pageState == PageState.SUCCESS}
	<div class="text-center w-screen flex flex-col justify-center items-center gap-8">
		<p class="text-6xl text-glow">{qr?.task.scanner_task.title}</p>
		<p class="text-4xl text-glow">{qr?.task.scanner_task.points} points</p>

		<form action="#" on:submit|preventDefault={onSubmit}>
			<input
				type="text"
				class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56"
				placeholder="Enter your answer"
				required
			/>
			<div class="h-4 w-4"></div>
			<button
				type="submit"
				class="border-2 border-gray-300 text-white p-3 rounded-xl bg-transparent custom-shadow w-56"
				>Submit</button
			>
		</form>
	</div>
{:else if pageState == PageState.ANSWER_ERROR}
	<div class="text-center w-screen flex flex-col justify-center items-center gap-8">
		<p class="text-6xl text-glow">Wrong<span class="text-sm">(skill issue tbh)</span></p>
	</div>
{:else if pageState == PageState.ANSWER_CORRECT}
	<div class="text-center w-screen flex flex-col justify-center items-center gap-8">
		<p class="text-6xl text-glow">Correct!</p>
	</div>
{/if}
