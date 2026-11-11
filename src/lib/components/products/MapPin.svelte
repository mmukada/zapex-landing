<svelte:options namespace="svg" />

<script lang="ts">
	interface Props {
		x: number;
		y: number;
		/** Shown in the head of the pin, in place of its dot. */
		label?: string;
	}

	let { x, y, label }: Props = $props();
</script>

<!-- Map marker with its tip on x,y. -->
<g transform="translate({x} {y}) scale(1.25)" class="drop-shadow-sm">
	<path
		d="M0 0C-1.5-8-9-14-9-24A9 9 0 1 1 9-24C9-14 1.5-8 0 0Z"
		class="fill-accent stroke-white"
		stroke-width="1.5"
	/>
	{#if label}
		<text y="-20.5" text-anchor="middle" class="fill-white text-[10px] font-semibold">
			{label}
		</text>
	{:else}
		<circle cy="-24" r="3.5" class="fill-white" />
	{/if}
</g>
