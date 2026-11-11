<script lang="ts">
	import { FLOATING, STAGE } from './classes';

	// What the point at the centre of the radius query resolves to.
	const queryPoint = [
		{ label: 'Point', value: '51.0634, −1.3131' },
		{ label: 'Nearest address', value: '8 St George’s Street' },
		{ label: 'Ward', value: 'St Michael' },
		{ label: 'District', value: 'Winchester' },
		{ label: 'County', value: 'Hampshire' }
	] as const;

	const placeQueries = ['Nearest', 'Radius', 'Area', 'Geofence', 'Distance'] as const;

	// The search circle is centred on 600,300 with a radius of 150.
	const records = [
		{ x: 540, y: 255, inside: true },
		{ x: 650, y: 190, inside: true },
		{ x: 566, y: 196, inside: true },
		{ x: 700, y: 330, inside: true },
		{ x: 585, y: 395, inside: true },
		{ x: 500, y: 340, inside: true },
		{ x: 648, y: 372, inside: true },
		{ x: 400, y: 215, inside: false },
		{ x: 300, y: 290, inside: false },
		{ x: 440, y: 470, inside: false },
		{ x: 752, y: 150, inside: false },
		{ x: 880, y: 355, inside: false }
	] as const;
	const recordsInRadius = records.filter((record) => record.inside).length;
</script>

<div class="relative size-full overflow-hidden">
	<div class={[STAGE, '-top-22.5 -ml-150']}>
		<svg viewBox="0 0 1200 800" class="size-full">
			<use href="#products-basemap" />

			<!-- The other queries: an area search and a geofence -->
			<g
				class="fill-neutral-500/5 stroke-neutral-400"
				stroke-width="1.5"
				stroke-dasharray="4 4"
				stroke-linejoin="round"
			>
				<rect x="255" y="190" width="170" height="145" rx="2" />
				<path d="M800 325 865 270 955 300 965 410 885 465 810 420Z" />
			</g>

			<circle cx="600" cy="300" r="150" class="fill-accent/6 stroke-accent/45" stroke-width="1.5" />
			<path
				d="M600 300 729.9 225"
				class="stroke-accent/45"
				stroke-width="1.5"
				stroke-dasharray="3 3"
			/>
			<text
				x="665"
				y="256"
				text-anchor="middle"
				transform="rotate(-30 665 262.5)"
				class="radius-label fill-accent/70 text-[11px] font-semibold"
			>
				200 m
			</text>

			{#each records as record (`${record.x},${record.y}`)}
				<circle
					cx={record.x}
					cy={record.y}
					r="5"
					class={record.inside ? 'fill-accent stroke-white' : 'fill-white stroke-neutral-400'}
					stroke-width="1.5"
				/>
			{/each}
			<circle cx="600" cy="300" r="5.5" class="fill-navy stroke-white" stroke-width="2" />
		</svg>
	</div>

	<ul
		class={[
			FLOATING,
			'absolute top-3 left-3 flex max-w-[calc(100%-1.5rem)] gap-0.5 overflow-hidden p-0.5'
		]}
		aria-label="Queries"
	>
		{#each placeQueries as query (query)}
			<li
				class={[
					'shrink-0 rounded-md px-2.5 py-1 text-xs font-medium',
					query === 'Radius' ? 'bg-neutral-900 text-white' : 'text-neutral-500'
				]}
				aria-current={query === 'Radius' ? 'true' : undefined}
			>
				{query}
			</li>
		{/each}
	</ul>

	<dl class={[FLOATING, 'absolute top-3 right-3 hidden w-64 flex-col gap-1 py-2 lg:flex']}>
		{#each queryPoint as field (field.label)}
			<div class="flex items-baseline justify-between gap-3 px-3">
				<dt class="shrink-0 text-[0.6875rem] text-neutral-400">{field.label}</dt>
				<dd class="truncate text-xs font-medium text-neutral-800 tabular-nums">{field.value}</dd>
			</div>
		{/each}
		<div
			class="mt-1 flex items-baseline justify-between gap-3 border-t border-neutral-100 px-3 pt-2"
		>
			<dt class="text-[0.6875rem] text-neutral-400">Within 200 m</dt>
			<dd class="text-xs text-neutral-400">
				<span class="font-semibold text-neutral-800 tabular-nums">{recordsInRadius}</span>
				of {records.length} records
			</dd>
		</div>
	</dl>
</div>

<style>
	/* Keeps the label legible where it crosses the streets and their names. */
	.radius-label {
		paint-order: stroke;
		stroke: #fff;
		stroke-width: 3px;
		stroke-linejoin: round;
	}
</style>
