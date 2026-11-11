<script lang="ts">
	import LocateFixedIcon from '@lucide/svelte/icons/locate-fixed';
	import MinusIcon from '@lucide/svelte/icons/minus';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { FIELD, FLOATING, HALO, STAGE } from './classes';
	import MapPin from './MapPin.svelte';

	// `x` and `y` place each branch on its street in the basemap.
	const branches = [
		{
			name: 'Parchment Street',
			distance: '0.1 mi',
			closes: '6pm',
			x: 442.1,
			y: 318
		},
		{
			name: 'Staple Gardens',
			distance: '0.2 mi',
			closes: '5:30pm',
			x: 296.4,
			y: 280
		},
		{ name: 'North Walls', distance: '0.2 mi', closes: '8pm', x: 626, y: 155.3 },
		{
			name: 'Eastgate Street',
			distance: '0.3 mi',
			closes: '6pm',
			x: 806.8,
			y: 222.9
		}
	] as const;
	const [nearestBranch, ...otherBranches] = branches;

	const locationFilters = ['Open now', 'Click & collect', 'Pharmacy'] as const;
</script>

{#snippet locationSearch()}
	<p class={FIELD}>
		<LocateFixedIcon class="text-accent size-4 shrink-0" />
		<span class="min-w-0 flex-1 truncate">SO23 9LJ</span>
		<span class="shrink-0 text-xs text-neutral-400">{branches.length} open nearby</span>
	</p>
{/snippet}

<div class="flex size-full">
	<div class="relative z-10 hidden w-80 shrink-0 border-r border-neutral-200 bg-white p-4 md:block">
		{@render locationSearch()}

		<ul class="mt-2.5 flex gap-1.5" aria-label="Filters">
			{#each locationFilters as filter (filter)}
				<li
					class={[
						'rounded-full border px-2 py-0.5 text-[0.6875rem] font-medium whitespace-nowrap',
						filter === 'Open now'
							? 'border-accent/30 bg-accent/8 text-accent'
							: 'border-neutral-200 text-neutral-500'
					]}
					aria-current={filter === 'Open now' ? 'true' : undefined}
				>
					{filter}
				</li>
			{/each}
		</ul>

		<ol class="mt-3 flex flex-col gap-1" aria-label="Nearest branches">
			{#each branches as branch, i (branch.name)}
				<li class={['flex items-center gap-3 rounded-lg px-2.5 py-2', i === 0 && 'bg-neutral-100']}>
					<span
						class={[
							'flex size-5 shrink-0 items-center justify-center rounded-full text-[0.6875rem] font-semibold',
							i === 0 ? 'bg-accent text-white' : 'border border-neutral-300 text-neutral-600'
						]}
						aria-hidden="true"
					>
						{i + 1}
					</span>
					<div class="min-w-0 flex-1">
						<p class="truncate text-sm font-medium text-neutral-800">{branch.name}</p>
						<p class="truncate text-xs text-neutral-400">
							{branch.distance}
						</p>
					</div>
					<span class="shrink-0 text-[0.6875rem] font-medium text-green-600">
						Open until {branch.closes}
					</span>
				</li>
			{/each}
		</ol>
	</div>

	<div class="relative min-w-0 flex-1 overflow-hidden">
		<div class={[STAGE, '-top-42.5 -ml-100.75 md:-top-20 md:-ml-132 lg:-ml-138']}>
			<svg viewBox="0 0 1200 800" class="size-full">
				<use href="#products-basemap" />

				<!-- Straight line from the searched postcode to the nearest branch -->
				<path
					d="M500.8 384.8 {nearestBranch.x} {nearestBranch.y}"
					class="stroke-accent"
					fill="none"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-dasharray="0.1 7"
				/>
				<circle cx="500.8" cy="384.8" r="15" class={[HALO, 'fill-accent/15']} />
				<circle cx="500.8" cy="384.8" r="6" class="fill-accent stroke-white" stroke-width="2.5" />

				{#each otherBranches as branch, i (branch.name)}
					<g transform="translate({branch.x} {branch.y})">
						<circle r="11" class="fill-white stroke-neutral-400" stroke-width="1.5" />
						<text y="4" text-anchor="middle" class="fill-neutral-700 text-[11px] font-semibold">
							{i + 2}
						</text>
					</g>
				{/each}
				<MapPin x={nearestBranch.x} y={nearestBranch.y} label="1" />
			</svg>
			<span
				class="absolute -translate-x-1/2 -translate-y-full rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs font-medium whitespace-nowrap text-neutral-700 shadow-sm"
				style:left="{nearestBranch.x}px"
				style:top="{nearestBranch.y - 48}px"
				aria-hidden="true"
			>
				{nearestBranch.name} · {nearestBranch.distance}
			</span>
		</div>

		<div
			class={[FLOATING, 'absolute top-3 right-3 hidden flex-col text-neutral-500 md:flex']}
			aria-hidden="true"
		>
			<span class="flex size-7 items-center justify-center border-b border-neutral-200">
				<PlusIcon class="size-3.5" />
			</span>
			<span class="flex size-7 items-center justify-center">
				<MinusIcon class="size-3.5" />
			</span>
		</div>
		<div class="absolute inset-x-3 top-3 md:hidden">
			{@render locationSearch()}
		</div>
	</div>
</div>
