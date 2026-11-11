<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		/** ID of the heading that labels this section. */
		labelledBy: string;
		/** Fades the frame's vertical borders out toward the bottom: for the last section of a page. */
		fade?: boolean;
		class?: string;
		children: Snippet;
	}

	let { id, labelledBy, fade = false, class: className, children }: Props = $props();
</script>

<!--
	The content frame shared by the full-width sections of a page: vertical
	borders either side of the constrained column, on sm+ viewports only.
-->
<section {id} aria-labelledby={labelledBy} class={['px-4', className]}>
	<div
		class={['max-w-frame relative mx-auto', fade ? 'fade' : 'sm:border-x sm:border-neutral-200']}
	>
		{@render children()}
	</div>
</section>

<style>
	/* The borders are drawn by a layer of their own, so the mask leaves the content alone. */
	.fade::before {
		content: '';
		pointer-events: none;
		position: absolute;
		inset: 0;
		mask-image: linear-gradient(to bottom, black 65%, transparent);
	}

	@media (min-width: 640px) {
		.fade::before {
			border-inline: 1px solid #e5e5e5;
		}
	}
</style>
