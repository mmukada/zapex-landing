<script lang="ts">
	import { borderGlow } from './borderGlow';

	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<div
	class="relative inline-block rounded-full border border-neutral-300 text-xs leading-none font-medium drop-shadow-[0_1px_1px_rgb(0_0_0/0.05)]"
>
	<!-- The glow fills the pill and shows through as its border, round the label laid over it. -->
	<div
		class="glow pointer-events-none absolute -inset-px rounded-[inherit]"
		aria-hidden="true"
		{@attach borderGlow}
	></div>
	<div class="relative m-px rounded-[inherit] bg-white px-4 py-1.5 text-neutral-800">
		{label}
	</div>
</div>

<style>
	.glow {
		background: conic-gradient(
			from var(--angle, -80deg) at var(--x, 0px) var(--y, 0px),
			transparent,
			#a3ece9 20deg,
			#709ff5 100deg,
			#709ff5 120deg,
			transparent 140deg
		);
	}
</style>
