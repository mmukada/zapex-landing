<script lang="ts">
	import type { Snippet } from 'svelte';
	import Grid from './Grid.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="grid-section">
	<div class="frame">
		<div class="backdrop" aria-hidden="true">
			<div class="borders"></div>
			<div class="pattern flank left"><Grid offset={[1, 1]} /></div>
			<div class="pattern flank right"><Grid offset={[0, 1]} /></div>
			<div class="pattern center"><Grid offset={[0, 1]} /></div>
		</div>

		<div class="content">{@render children()}</div>
	</div>
</div>

<style>
	.grid-section {
		--border-color: #e5e5e5;
		--pattern-color: rgb(229 229 229 / 0.6);
		--content-width: var(--max-width-frame);
		--flank-width: 360px;
		--pattern-height: 600px;
		--gutter: 16px;
		--fade-down: linear-gradient(transparent, black);

		position: relative;
		overflow: clip;
		padding-inline: var(--gutter);
	}

	.frame {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		max-width: var(--content-width);
		margin-inline: auto;
	}

	.backdrop {
		pointer-events: none;
		position: absolute;
		inset: 0;
	}

	/* Vertical frame lines, fading in from the top — sm+ only (hidden on phones). */
	.borders {
		position: absolute;
		inset: 0;
		mask-image: var(--fade-down);
	}

	@media (min-width: 640px) {
		.borders {
			border-inline: 1px solid var(--border-color);
		}
	}

	/*
	 * Each pattern layer is a full-height masked window with the checkered
	 * SVG pinned to its bottom, so the top fade spans the whole section.
	 */
	.pattern {
		position: absolute;
		inset-block: 0;
		overflow: hidden;
		mask-composite: intersect;
	}

	.pattern :global(svg) {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: var(--pattern-height);
		color: var(--pattern-color);
	}

	/* Flanks hang off the frame's edges, fading towards the page edges */
	.flank {
		width: var(--flank-width);
	}

	.flank.left {
		right: 100%;
		mask-image: var(--fade-down), linear-gradient(90deg, transparent, black);
	}

	.flank.right {
		left: 100%;
		mask-image: var(--fade-down), linear-gradient(270deg, transparent, black);
	}

	/* Center pattern sits between the frame lines, vignetted at the bottom */
	.center {
		inset-inline: 1px;
		mask-image: var(--fade-down), radial-gradient(130% 50% at 50% 100%, transparent, black);
	}

	.content {
		position: relative;
	}
</style>
