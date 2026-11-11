<script lang="ts">
	import { onMount, type Component, type Snippet } from 'svelte';
	import DatabaseIcon from '@lucide/svelte/icons/database';
	import HexagonIcon from '@lucide/svelte/icons/hexagon';
	import LayoutTemplateIcon from '@lucide/svelte/icons/layout-template';
	import MapPinIcon from '@lucide/svelte/icons/map-pin';
	import PuzzleIcon from '@lucide/svelte/icons/puzzle';
	import RadarIcon from '@lucide/svelte/icons/radar';
	import SearchIcon from '@lucide/svelte/icons/search';
	import StoreIcon from '@lucide/svelte/icons/store';
	import TextCursorInputIcon from '@lucide/svelte/icons/text-cursor-input';
	import { ORGANIZATION_ID, SITE_URL } from '$lib/config';
	import JsonLd from '../JsonLd.svelte';
	import SectionFrame from '../SectionFrame.svelte';
	import AddressVisual from './AddressVisual.svelte';
	import PlaceVisual from './PlaceVisual.svelte';
	import LocationsVisual from './LocationsVisual.svelte';
	import MapDefs from './MapDefs.svelte';

	interface Feature {
		name: string;
		detail: string;
		icon: Component<{ class?: string }>;
	}

	interface Tab {
		/** Panel id; doubles as the hash that deep-links to the tab (e.g. `/#locations`). */
		id: string;
		label: string;
		features: Feature[];
		/** Text alternative for the infographic. */
		alt: string;
		/** Colours of the icon square on the tab. */
		tone: string;
		/** Colour of the progress line beside the feature on show: the icon square's. */
		progress: string;
		/** Glyph for the icon square on the tab. */
		icon: Snippet;
		visual: Component;
	}

	const tabs: Tab[] = [
		{
			id: 'address',
			label: 'Address',
			features: [
				{
					name: 'Autocomplete',
					detail:
						'Typo-tolerant flexi-search as you type: narrows to an address from the starts of its words, its number and its outward code, in any order ("ches 37 brom mk43"), ranking matching addresses from the first keystrokes in under 25ms',
					icon: TextCursorInputIcon
				},
				{
					name: 'Lookup & cleansing',
					detail:
						'The structured, canonical record of a selected result, every address at a postcode, or an address as written cleansed and standardised, one at a time or in batches, with a match confidence',
					icon: SearchIcon
				},
				{
					name: 'Address widget',
					detail:
						'Drop-in JavaScript and React address field that brings autocomplete and lookup to any form with a few lines of code',
					icon: LayoutTemplateIcon
				}
			],
			alt: 'Example: typing “Jameson Avenue” suggests matching UK addresses, and selecting one returns its canonical record with coordinates.',
			tone: 'fill-indigo-400 text-indigo-950',
			progress: 'bg-indigo-400',
			icon: addressIcon,
			visual: AddressVisual
		},
		{
			id: 'place',
			label: 'Place',
			features: [
				{
					name: 'Geocoding',
					detail:
						'Resolve an address to its coordinates with a confidence score and how each part matched, or a point to its nearest address',
					icon: MapPinIcon
				},
				{
					name: 'Geography & zones',
					detail:
						'Local authority, ward, district, county, constituency, LSOA, region and ONS codes for any address or point, and checks of whether it falls in those areas or in zones you send as GeoJSON',
					icon: HexagonIcon
				},
				{
					name: 'Nearby amenities',
					detail:
						'Rail stations and Tube, metro, tram and bus stops across Great Britain, and schools in England with their Ofsted outcomes, each with its distance and coordinates',
					icon: RadarIcon
				}
			],
			alt: 'Example: a point in Winchester resolved to its nearest address and administrative areas, with a search of the area around it.',
			tone: 'fill-emerald-400 text-emerald-950',
			progress: 'bg-emerald-400',
			icon: placeIcon,
			visual: PlaceVisual
		},
		{
			id: 'locations',
			label: 'Locations',
			features: [
				{
					name: 'Hosted locations',
					detail:
						'Keep your branches, stores and collection points up to date through an API, with batch upsert: opening hours, tags, custom fields and whether each is active',
					icon: DatabaseIcon
				},
				{
					name: 'Location search',
					detail:
						'Find a location by its name or ID, the nearest to an address or point, or every one within a radius or bounding box, filtered by tags and open now, with the straight-line distance to each',
					icon: StoreIcon
				},
				{
					name: 'Locations widget',
					detail:
						'Embeddable <zapex-locations> picker that lets customers choose their nearest location in a few lines of code',
					icon: PuzzleIcon
				}
			],
			alt: 'Example: a locations search listing the open branches nearest a postcode, ranked by distance.',
			tone: 'fill-orange-400 text-orange-950',
			progress: 'bg-orange-400',
			icon: locationsIcon,
			visual: LocationsVisual
		}
	];

	let active = $state(0);
	const tabEls: HTMLButtonElement[] = $state([]);

	// The feature on show under each illustration. They take turns, each for as
	// long as its progress line takes to fill, until one is clicked: that one
	// then stays on show.
	const shown = $state(tabs.map(() => ({ feature: 0, cycling: true })));

	// The features of the current tab only take turns while they are on screen,
	// so the first is the one on show when they are scrolled to.
	const featureEls: HTMLUListElement[] = $state([]);
	let featuresInView = $state(false);

	$effect(() => {
		const features = featureEls[active];
		if (!features) return;

		const observer = new IntersectionObserver(([entry]) => {
			featuresInView = entry.isIntersecting;
		});
		observer.observe(features);

		return () => observer.disconnect();
	});

	// Arrow keys move between tabs and select as they go (WAI-ARIA tabs pattern).
	function onTabKeydown(event: KeyboardEvent) {
		const last = tabs.length - 1;
		const target = {
			ArrowRight: active === last ? 0 : active + 1,
			ArrowLeft: active === 0 ? last : active - 1,
			Home: 0,
			End: last
		}[event.key];
		if (target === undefined) return;

		event.preventDefault();
		active = target;
		tabEls[target]?.focus();
	}

	// The tabs' ids before the products were renamed, so that old links still work.
	const formerIds: Record<string, string> = { geospatial: 'place', locator: 'locations' };

	// Deep links: `/#locations` selects that tab.
	function selectFromHash() {
		const hash = window.location.hash.slice(1);
		const id = formerIds[hash] ?? hash;
		const index = tabs.findIndex((tab) => tab.id === id);
		if (index !== -1) active = index;
	}

	onMount(selectFromHash);

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		'@id': `${SITE_URL}/#products`,
		name: 'UK address, place and location APIs',
		itemListElement: tabs.map((tab, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			item: {
				'@type': 'Service',
				'@id': `${SITE_URL}/#${tab.id}`,
				name: tab.label,
				description: tab.features.map(({ name, detail }) => `${name}: ${detail}.`).join(' '),
				url: `${SITE_URL}/#${tab.id}`,
				provider: { '@id': ORGANIZATION_ID },
				areaServed: { '@type': 'Country', name: 'United Kingdom' }
			}
		}))
	};
</script>

<svelte:window onhashchange={selectFromHash} />

<!--
	The tab glyphs, placed in the middle of the icon's 18×18 square. The magnifier
	is drawn a step smaller than the other two, which balances them by eye.
-->
{#snippet addressIcon()}
	<svg x="3" y="3" width="12" height="12" viewBox="0 0 12 12" fill="none">
		<g stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
			<circle cx="5.25" cy="5.25" r="3.6" />
			<path d="M8 8 10.35 10.35" />
		</g>
	</svg>
{/snippet}

{#snippet placeIcon()}
	<svg x="2" y="2" width="14" height="14" viewBox="0 0 12 12" fill="none">
		<g stroke="currentColor" stroke-width="1.1">
			<circle cx="6" cy="6" r="4.45" />
			<ellipse cx="6" cy="6" rx="1.9" ry="4.45" />
			<path d="M1.55 6h8.9" />
		</g>
	</svg>
{/snippet}

{#snippet locationsIcon()}
	<svg x="2" y="2" width="14" height="14" viewBox="0 0 12 12" fill="none">
		<path
			stroke="currentColor"
			stroke-width="1.3"
			stroke-linejoin="round"
			d="M6 10.35S2.4 7.6 2.4 5.1a3.6 3.6 0 0 1 7.2 0C9.6 7.6 6 10.35 6 10.35Z"
		/>
		<circle cx="6" cy="5.1" r="1.1" fill="currentColor" />
	</svg>
{/snippet}

<!-- Curved shoulder that widens the tab bar's notch into the section's top edge. -->
{#snippet shoulder(flipped = false)}
	<svg
		viewBox="0 0 85 64"
		class={[
			'hidden h-full w-auto shrink-0 fill-white md:block',
			flipped ? '-translate-x-px -scale-x-100' : 'translate-x-px'
		]}
	>
		<path
			d="M50 45C57.3095 56.6952 71.2084 63.9997 85 64V0H0C13.7915 0 26.6905 7.30481 34 19L50 45Z"
		/>
	</svg>
{/snippet}

<JsonLd {schema} />

<div class="relative overflow-clip bg-neutral-100">
	<SectionFrame id="products" labelledBy="products-heading" class="scroll-mt-18">
		<h2 id="products-heading" class="sr-only">Products</h2>

		<MapDefs />

		<!--
			The tab bar sits in a white notch let into the top edge, so it reads as
			part of the hero above. Below md the notch is dropped.
		-->
		<div class="relative mx-auto flex max-w-2xl items-start justify-center md:h-16">
			{@render shoulder()}
			<div class="relative z-10 min-w-0 grow md:h-full md:bg-white">
				<div
					role="tablist"
					aria-labelledby="products-heading"
					class="flex size-full flex-wrap items-center justify-center gap-2 pt-4 md:gap-2.5 md:pt-0"
				>
					{#each tabs as tab, t (tab.id)}
						{@const selected = t === active}
						<button
							bind:this={tabEls[t]}
							type="button"
							role="tab"
							id="{tab.id}-tab"
							aria-selected={selected}
							aria-controls={tab.id}
							tabindex={selected ? 0 : -1}
							class={[
								'flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-2 whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2',
								selected
									? 'bg-white text-neutral-800 drop-shadow-xs'
									: 'bg-neutral-100 text-neutral-600 hover:text-neutral-800 md:border-transparent'
							]}
							onclick={() => (active = t)}
							onkeydown={onTabKeydown}
						>
							<!--
								The square and its glyph are one drawing, and it is the group
								inside that grows on hover: see `.tab-icon` below.
							-->
							<svg viewBox="-3 -3 24 24" class="-m-0.75 size-6 drop-shadow-md" aria-hidden="true">
								<g class={['tab-icon', tab.tone]}>
									<rect width="18" height="18" rx="4" />
									<rect
										x="0.5"
										y="0.5"
										width="17"
										height="17"
										rx="3.5"
										class="fill-none stroke-black/5"
									/>
									{@render tab.icon()}
								</g>
							</svg>
							<span class="text-[0.825em] leading-none font-medium">{tab.label}</span>
						</button>
					{/each}
				</div>
			</div>
			{@render shoulder(true)}
		</div>

		<!--
			Every panel stays mounted so switching tabs cross-fades. Only the current
			one is in flow: the others are laid over it, so the section takes the
			height of the tab on show.
		-->
		<div class="relative mx-auto mt-6 max-w-235 sm:px-4">
			{#each tabs as tab, t (tab.id)}
				{@const current = t === active}
				<div
					id={tab.id}
					role="tabpanel"
					aria-labelledby="{tab.id}-tab"
					inert={!current}
					data-current={current}
					class={[
						'group scroll-mt-40 transition-opacity duration-300 motion-reduce:transition-none',
						current ? 'relative' : 'absolute inset-x-0 top-0 opacity-0 sm:inset-x-4'
					]}
				>
					<!--
						One image to assistive tech, shown at 92%: the infographic is laid out
						at full size in a box that much larger than the frame, then scaled
						back down into it.

						It is set in the system font, which the shared maps take from here
						through <use>. Only their street names stay in Inter. What moves in
						it only does so while `data-current` says its panel is on show.
					-->
					<div
						role="img"
						aria-label={tab.alt}
						class="font-system mx-auto h-92 w-[92%] overflow-hidden rounded-t-lg border-x border-t border-neutral-200 bg-white mask-[linear-gradient(black_65%,transparent)] transition-transform duration-300 select-none group-data-[current=false]:translate-y-6 motion-reduce:transition-none sm:rounded-t-xl"
					>
						<div class="size-[calc(100%/0.92)] origin-top-left scale-92">
							<tab.visual />
						</div>
					</div>

					<ul
						bind:this={featureEls[t]}
						data-playing={current && featuresInView}
						class="mx-auto grid w-[92%] gap-x-10 gap-y-8 pt-8 pb-14 sm:grid-cols-3 md:pb-16"
					>
						{#each tab.features as feature, f (feature.name)}
							{@const onShow = shown[t].feature === f}
							<!--
								A click only keeps the feature on show. Every feature can be read
								without it, so there is nothing here for the keyboard.
							-->
							<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
							<li
								class={[
									'relative flex cursor-pointer flex-col items-start pr-2 pl-6 text-sm text-neutral-900 transition-opacity duration-500 motion-reduce:transition-none',
									!onShow && 'opacity-50 hover:opacity-70'
								]}
								onclick={() => (shown[t] = { feature: f, cycling: false })}
							>
								<!-- The line carries on from the left edge of the illustration. -->
								<span
									class="absolute top-0 left-0 h-full w-px overflow-hidden bg-neutral-200"
									aria-hidden="true"
								>
									<span
										class={['progress block size-full', tab.progress]}
										data-state={onShow ? (shown[t].cycling ? 'filling' : 'full') : undefined}
										onanimationend={() => (shown[t].feature = (f + 1) % tab.features.length)}
									></span>
								</span>
								<feature.icon class="size-4" />
								<h3 class="mt-2 font-medium">{feature.name}</h3>
								<p class="mt-3.5 text-pretty text-neutral-500">{feature.detail}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</SectionFrame>
</div>

<style>
	/*
		A tab icon grows on hover inside an SVG that stays put. Scaling an HTML box
		instead makes it wobble: browsers round each box to whole pixels on its own,
		so the square grows in steps while the glyph slides about inside it.

		The size is animated through a registered number that `scale` reads, not by
		a transition on `scale`, which stretches a bitmap of the icon and redraws it
		only at the end. 20 / 18 takes the 18px square to a whole 20px.
	*/
	@property --tab-icon-scale {
		syntax: '<number>';
		inherits: false;
		initial-value: 1;
	}

	.tab-icon {
		scale: var(--tab-icon-scale);
		transform-origin: 9px 9px;
		transition: --tab-icon-scale 150ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	@media (hover: hover) {
		[role='tab']:hover .tab-icon {
			--tab-icon-scale: calc(20 / 18);
		}
	}

	/*
		The progress line of a feature. It fills from the top while the feature is
		on show, and the end of the animation hands over to the next feature. Off
		show it fades out first and empties once it can no longer be seen.
	*/
	.progress {
		translate: 0 -100%;
		opacity: 0;
		transition:
			opacity 150ms,
			translate 0s 500ms;
	}

	.progress[data-state] {
		translate: 0;
		opacity: 1;
		transition: opacity 150ms;
	}

	/* A line stops where it is while its features are off screen or off show. */
	.progress[data-state='filling'] {
		animation: progressFill 5s linear paused;
	}

	[data-playing='true'] .progress[data-state='filling'] {
		animation-play-state: running;
	}

	@keyframes progressFill {
		from {
			translate: 0 -100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		/* The features stop taking turns: the line of the one on show is full. */
		.tab-icon,
		.progress,
		.progress[data-state] {
			transition: none;
		}

		.progress[data-state='filling'] {
			animation: none;
		}
	}
</style>
