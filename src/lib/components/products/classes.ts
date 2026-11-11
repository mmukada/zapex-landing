/** Class lists shared by the product illustrations. */

// A map at its natural size, so its labels stay legible at every width. Each
// illustration centres it on a point of interest with a negative left margin
// (x) and top offset (y).
export const STAGE = 'absolute left-1/2 h-200 w-300';

export const FIELD =
	'flex h-10 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900 shadow-xs';

export const FLOATING = 'rounded-lg border border-neutral-200 bg-white shadow-sm';

// A ring around a point on the map, which pulses while its panel is on show.
export const HALO =
	'origin-center [transform-box:fill-box] group-data-[current=true]:motion-safe:animate-halo-pulse';
