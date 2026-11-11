import type { Attachment } from 'svelte/attachments';

const LAP_MS = 4000;

/** Where the centre of the gradient is, and which way it faces, `at` a fraction of a lap. */
interface Waypoint {
	at: number;
	angle: number;
	x: number;
}

/**
 * A lap of a pill, timed by distance so the glow moves at a constant speed:
 * along the top, round the right end, back along the bottom and round the left.
 */
function lap(width: number, height: number): Waypoint[] {
	const radius = height / 2;
	const straight = width - height;
	const end = Math.PI * radius;
	const perimeter = 2 * (straight + end);
	const [left, right] = [radius, width - radius];

	return [
		{ at: 0, angle: -80, x: left },
		{ at: straight / perimeter, angle: -80, x: right },
		{ at: (straight + end) / perimeter, angle: 100, x: right },
		{ at: (2 * straight + end) / perimeter, angle: 100, x: left },
		{ at: 1, angle: 280, x: left }
	];
}

function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

/**
 * Sweeps a highlight round the border of a pill. It drives the `--angle`,
 * `--x` and `--y` of the element, for a conic gradient to be drawn from.
 */
export const borderGlow: Attachment<HTMLElement> = (node) => {
	let frame = 0;

	const observer = new ResizeObserver(() => {
		cancelAnimationFrame(frame);

		const { width, height } = node.getBoundingClientRect();
		if (!width || !height) return;

		const waypoints = lap(width, height);
		node.style.setProperty('--y', `${height / 2}px`);

		let start = 0;
		const tick = (now: number) => {
			start ||= now;
			const progress = ((now - start) % LAP_MS) / LAP_MS;

			const next = waypoints.findIndex((waypoint) => waypoint.at >= progress) || 1;
			const [from, to] = [waypoints[next - 1], waypoints[next]];
			const t = to.at > from.at ? (progress - from.at) / (to.at - from.at) : 0;

			node.style.setProperty('--angle', `${lerp(from.angle, to.angle, t)}deg`);
			node.style.setProperty('--x', `${lerp(from.x, to.x, t)}px`);
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
	});
	observer.observe(node);

	return () => {
		observer.disconnect();
		cancelAnimationFrame(frame);
	};
};
