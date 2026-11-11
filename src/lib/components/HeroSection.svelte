<script lang="ts">
	import AnnouncementPill from './AnnouncementPill.svelte';
	import GridSection from './GridSection.svelte';
</script>

<GridSection>
	<section
		class="max-w-layout mx-auto flex w-full flex-col items-center gap-12 px-4 pt-16 pb-10 sm:px-6"
		aria-labelledby="hero-title"
	>
		<AnnouncementPill label="Sub-25ms typo-tolerant autocomplete latency" />
		<div class="flex flex-col items-center gap-5">
			<h1
				id="hero-title"
				class="max-w-160 text-center text-[2.0rem]/[1.25] font-[640] text-[#0c0c0e] sm:text-[2.4rem]/[1.15]"
			>
				The address and location layer
			</h1>
			<p class="max-w-190 text-center text-lg/[1.6] text-neutral-500">
				Address and location APIs + widgets for UK organisations, so people enter the right address
				and find the right place, first time.
			</p>
		</div>
	</section>
</GridSection>
