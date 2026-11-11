<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Displayed inside the circular marker, e.g. its position in the list of sections. */
		number: number;
		/** Anchor id, also targeted by the accompanying table-of-contents links. */
		id: string;
		title: string;
		children: Snippet;
	}

	let { number, id, title, children }: Props = $props();
</script>

<!--
	A numbered legal-document section: a circular marker sits on a vertical line that
	runs the full height of the block, continuing seamlessly into the next section so
	the markers read as stops along one connected line down the page.
-->
<div class="relative">
	<div class="absolute inset-y-0 left-4 w-px bg-neutral-200" aria-hidden="true"></div>

	<a href={`#${id}`} class="group relative flex items-center gap-4 font-sans font-bold">
		<span
			class="flex size-8 flex-none items-center justify-center rounded-full border border-neutral-200 bg-white text-[1em] text-neutral-700"
		>
			{number}
		</span>
		<h2 {id} class="m-0! scroll-mt-24 text-[1em] text-neutral-900 no-underline">
			{title}
		</h2>
	</a>

	<div class="ml-12 flex flex-col gap-3 pt-3 pb-8">
		{@render children()}
	</div>
</div>
