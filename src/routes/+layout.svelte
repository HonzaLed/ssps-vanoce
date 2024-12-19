<script>
	import '../app.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
</script>

<div class="absolute top-0 right-0 text-gray-200 pt-2 pr-4 text-xl">
	Your team is 5
</div>
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
		box-shadow:
			0px 0px 32px 6px var(--color-glow)
	}

	:global(.text-glow) {
		--color-glow: hsl(from var(--color-inner) h calc(s + 2) calc(l + 50));
		text-shadow:
			0px 0px 17px #fff /*var(--color-glow)*/
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