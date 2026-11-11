<script lang="ts">
	import { scrollY } from 'svelte/reactivity/window';
	import { SITE_NAME } from '$lib/config';
	import EarlyAccessLink from './EarlyAccessLink.svelte';

	const SCROLL_THRESHOLD = 40;

	const scrolled = $derived((scrollY.current ?? 0) > SCROLL_THRESHOLD);
</script>

<header class="sticky top-0 z-30">
	<div
		class={[
			'absolute inset-0 transition-[background-color,backdrop-filter] duration-150',
			scrolled && 'bg-white/75 backdrop-blur-lg'
		]}
		aria-hidden="true"
	></div>
	<div class="max-w-layout relative mx-auto flex h-18 items-center justify-between px-4">
		<a href="/">
			<img
				src="/images/logo.svg"
				class="h-6.25 w-auto"
				width="93"
				height="25"
				alt={SITE_NAME}
				fetchpriority="high"
			/>
		</a>
		<EarlyAccessLink
			class="flex h-8 items-center justify-center rounded-[7px] border border-black bg-black px-4 text-[0.8em] leading-none font-semibold whitespace-nowrap text-white no-underline transition-[background-color,box-shadow] duration-150 hover:bg-neutral-800 hover:shadow-[0_0_0_4px_#e5e7eb]"
		>
			Join for early access
		</EarlyAccessLink>
	</div>
</header>
