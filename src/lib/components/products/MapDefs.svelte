<script lang="ts">
	import {
		BUILDINGS,
		CITY_GREENS,
		CITY_INSET,
		CITY_LABELS,
		CITY_MOTORWAY,
		CITY_RAILWAY,
		CITY_RIVER,
		CITY_ROADS,
		CITY_SHIELDS,
		CITY_STREETS,
		CITY_TRUNK_ROAD,
		GREENS,
		MAIN_ROADS,
		MAP_LABELS,
		RAILWAY,
		RIVER,
		SIDE_STREETS,
		type MapLabel,
		type MapLabelKind
	} from './winchester';

	const LABEL_TONE: Record<MapLabelKind, string> = {
		street: 'fill-slate-400 font-sans',
		place: 'fill-slate-500 font-medium',
		green: 'fill-green-700/70',
		water: 'fill-sky-600/80 italic',
		area: 'map-halo fill-slate-500 text-[10px] font-medium',
		city: 'map-halo fill-slate-600 text-[13px] font-semibold'
	};
</script>

{#snippet mapLabels(labels: MapLabel[])}
	<g text-anchor="middle" dominant-baseline="central" class="text-[9px] tracking-wide">
		{#each labels as label, i (i)}
			<text
				x={label.x}
				y={label.y}
				transform="rotate({label.angle} {label.x} {label.y})"
				class={LABEL_TONE[label.kind]}
			>
				{label.name}
			</text>
		{/each}
	</g>
{/snippet}

<!-- The maps, drawn once and shared by the illustrations through <use>. -->
<svg class="absolute size-0" aria-hidden="true">
	<defs>
		<g id="products-basemap-features">
			<path d={GREENS} fill="#dcecdc" stroke="#dcecdc" stroke-width="10" stroke-linejoin="round" />
			<path d={BUILDINGS} fill="#dfe3e8" />
			<g fill="none" stroke-linejoin="round">
				<path d={RIVER} stroke="#d3e5f6" stroke-width="30" />
				<path d={RAILWAY} stroke="#cdd2d9" stroke-width="3.5" />
				<path d={RAILWAY} stroke="#f1f3f5" stroke-width="1.5" stroke-dasharray="7 7" />
				<g stroke-linecap="round">
					<path d={SIDE_STREETS} stroke="#fff" stroke-width="6" />
					<path d={MAIN_ROADS} stroke="#e2e6ea" stroke-width="14" />
					<path d={MAIN_ROADS} stroke="#fff" stroke-width="11" />
				</g>
			</g>
		</g>

		<g id="products-basemap">
			<rect width="1200" height="800" fill="#f1f3f5" />
			<use href="#products-basemap-features" />
			{@render mapLabels(MAP_LABELS)}
		</g>

		<g id="products-citymap">
			<rect width="1200" height="800" fill="#f1f3f5" />
			<path
				d={CITY_GREENS}
				fill="#dcecdc"
				stroke="#dcecdc"
				stroke-width="8"
				stroke-linejoin="round"
			/>
			<g fill="none" stroke-linejoin="round">
				<path d={CITY_RIVER} stroke="#d3e5f6" stroke-width="7.5" />
				<path d={CITY_RAILWAY} stroke="#cdd2d9" stroke-width="1" />
				<g stroke-linecap="round">
					<path d={CITY_STREETS} stroke="#fff" stroke-width="1.5" />
					<path d={CITY_ROADS} stroke="#e2e6ea" stroke-width="3.5" />
					<path d={CITY_ROADS} stroke="#fff" stroke-width="2.75" />
				</g>
				<path d={CITY_TRUNK_ROAD} stroke="#c3cfdd" stroke-width="5" />
				<path d={CITY_TRUNK_ROAD} stroke="#e4ebf3" stroke-width="3.5" />
				<path d={CITY_MOTORWAY} stroke="#c3cfdd" stroke-width="6.5" />
				<path d={CITY_MOTORWAY} stroke="#e4ebf3" stroke-width="5" />
			</g>
			<use href="#products-basemap-features" transform={CITY_INSET} />
			{@render mapLabels(CITY_LABELS)}
			{#each CITY_SHIELDS as shield, i (i)}
				<g transform="translate({shield.x} {shield.y})">
					<rect x="-10" y="-6" width="20" height="12" rx="3" class={shield.tone} />
					<text
						y="0.5"
						text-anchor="middle"
						dominant-baseline="central"
						class="fill-white text-[8px] font-semibold"
					>
						{shield.name}
					</text>
				</g>
			{/each}
		</g>
	</defs>
</svg>

<style>
	/* Lifts place names off the streets beneath them. */
	.map-halo {
		paint-order: stroke;
		stroke: #f1f3f5;
		stroke-width: 2.5px;
		stroke-linejoin: round;
	}
</style>
