<script lang="ts">
	import CheckIcon from '@lucide/svelte/icons/check';
	import MapPinIcon from '@lucide/svelte/icons/map-pin';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { FIELD, FLOATING, HALO, STAGE } from './classes';
	import MapPin from './MapPin.svelte';

	const suggestions = [
		{ number: 12, town: 'Winchester', county: 'Hampshire', postcode: 'SO22 5DY' },
		{ number: 47, town: 'Lewes', county: 'East Sussex', postcode: 'BN7 2LN' },
		{ number: 3, town: 'Marlow', county: 'Buckinghamshire', postcode: 'SL7 1AW' },
		{ number: 86, town: 'Stamford', county: 'Lincolnshire', postcode: 'PE9 2AL' }
	] as const;

	// The coordinates are those of the pin: about 1.2 km west of the point that
	// the place illustration queries, on the same map.
	const matchedAddress = [
		{ label: 'Line 1', value: '12 Jameson Avenue' },
		{ label: 'Town', value: 'Winchester' },
		{ label: 'Postcode', value: 'SO22 5DY' },
		{ label: 'UPRN', value: '100060591234' },
		{ label: 'Latitude', value: '51.0644' },
		{ label: 'Longitude', value: '−1.3296' },
		{ label: 'Match quality', value: 'Exact' }
	] as const;
	const MATCH_CONFIDENCE = 98;
</script>

<div class="flex size-full">
	<div class="relative z-10 w-full shrink-0 border-neutral-200 bg-white p-4 md:w-80 md:border-r">
		<p class={FIELD}>
			<SearchIcon class="text-accent size-4 shrink-0" />
			<span class="sr-only">Delivery address:</span>
			<span class="flex min-w-0 flex-1 items-center">
				Jameson Avenue<span
					class="bg-accent group-data-[current=true]:motion-safe:animate-caret-blink ml-px h-[1.1em] w-[1.5px]"
					aria-hidden="true"
				></span>
			</span>
			<span class="shrink-0 text-xs text-neutral-400">{suggestions.length} matches</span>
		</p>

		<ul class="mt-3 flex flex-col gap-1" aria-label="Suggestions">
			{#each suggestions as suggestion, i (suggestion.postcode)}
				<li
					class={['flex items-center gap-3 rounded-lg px-2.5 py-2', i === 0 && 'bg-neutral-100']}
					aria-current={i === 0 ? 'true' : undefined}
				>
					<span
						class={[
							'flex size-5 shrink-0 items-center justify-center rounded-full',
							i === 0 ? 'bg-accent text-white' : 'border border-neutral-300 text-neutral-500'
						]}
						aria-hidden="true"
					>
						<MapPinIcon class="size-3" />
					</span>
					<div class="min-w-0 flex-1">
						<p class="truncate text-sm font-medium text-neutral-800">
							{suggestion.number} Jameson Avenue
						</p>
						<p class="truncate text-xs text-sky-700/60">
							{suggestion.town}, {suggestion.county}
						</p>
					</div>
					<span class="shrink-0 text-[0.6875rem] font-medium text-neutral-400 tabular-nums">
						{suggestion.postcode}
					</span>
				</li>
			{/each}
		</ul>
	</div>

	<div class="relative hidden min-w-0 flex-1 overflow-hidden md:block">
		<div class={[STAGE, '-top-13.75 -ml-106 lg:-top-51 lg:-ml-148']}>
			<svg viewBox="0 0 1200 800" class="size-full">
				<use href="#products-citymap" />
				<circle cx="423" cy="353.4" r="26" class={[HALO, 'fill-accent/10 stroke-accent/40']} />
				<MapPin x={423} y={353.4} />
			</svg>
		</div>

		<!-- The match lines up with the field, and its record with the suggestions -->
		<div class="absolute top-4 right-4 w-88">
			<p class={[FIELD, 'shadow-sm']}>
				<span class="min-w-0 flex-1 truncate font-medium">12 Jameson Avenue, Winchester</span>
				<span
					class="flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-1.5 py-0.5 text-[0.6875rem] font-medium text-green-700"
				>
					<CheckIcon class="size-3" strokeWidth={3} />
					Matched
				</span>
			</p>

			<dl class={[FLOATING, 'mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 px-3.5 py-3']}>
				{#each matchedAddress as field (field.label)}
					<div class="min-w-0">
						<dt class="text-[0.6875rem] text-neutral-400">{field.label}</dt>
						<dd class="truncate text-xs font-medium text-neutral-800 tabular-nums">
							{field.value}
						</dd>
					</div>
				{/each}
				<div class="min-w-0">
					<dt class="text-[0.6875rem] text-neutral-400">Confidence</dt>
					<dd class="flex items-center gap-2">
						<span class="text-xs font-medium text-neutral-800 tabular-nums">
							{MATCH_CONFIDENCE}%
						</span>
						<span class="h-1 flex-1 overflow-hidden rounded-full bg-neutral-100" aria-hidden="true">
							<span class="block h-full rounded-full bg-green-500" style:width="{MATCH_CONFIDENCE}%"
							></span>
						</span>
					</dd>
				</div>
			</dl>
		</div>
	</div>
</div>
