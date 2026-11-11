<script lang="ts">
	const CELL_SIZE = 60;

	interface Props {
		/** Shifts the pattern in pixels so gridlines align with adjacent borders. */
		offset: [x: number, y: number];
	}

	let { offset }: Props = $props();

	const uid = $props.id();
	const patternId = `grid-${uid}`;
</script>

<svg class="block" width="100%" height="100%" aria-hidden="true">
	<defs>
		<pattern
			id={patternId}
			x={offset[0] - 1}
			y={offset[1] - 1}
			width={CELL_SIZE}
			height={CELL_SIZE}
			patternUnits="userSpaceOnUse"
		>
			<path
				d="M {CELL_SIZE} 0 L 0 0 0 {CELL_SIZE}"
				fill="transparent"
				stroke="currentColor"
				stroke-width="2"
			/>
		</pattern>
	</defs>
	<rect fill="url(#{patternId})" width="100%" height="100%" />
</svg>
