<script lang="ts">
	interface Props {
		items: { id: string; title: string }[];
	}

	let { items }: Props = $props();

	let activeId = $state<string | null>(null);

	$effect(() => {
		const headings = items
			.map((item) => document.getElementById(item.id))
			.filter((el): el is HTMLElement => el !== null);

		if (headings.length === 0) return;

		// Treat a heading as "active" once it crosses into the top ~30% of the
		// viewport, so the highlight updates a little ahead of scroll position.
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
						break;
					}
				}
			},
			{ rootMargin: '-96px 0px -70% 0px', threshold: 0 }
		);

		headings.forEach((heading) => observer.observe(heading));
		return () => observer.disconnect();
	});
</script>

<nav aria-label="On this page" class="hidden lg:block">
	<div class="sticky top-24 flex flex-col gap-4">
		<p class="flex items-center gap-1.5 text-[1em] font-medium text-neutral-500">
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				aria-hidden="true"
			>
				<line x1="21" y1="6" x2="3" y2="6" />
				<line x1="15" y1="12" x2="3" y2="12" />
				<line x1="17" y1="18" x2="3" y2="18" />
			</svg>
			On this page
		</p>
		<ul class="flex flex-col gap-3 border-l-2 border-neutral-200 pl-4">
			{#each items as item (item.id)}
				{@const active = activeId === item.id}
				<li class="relative">
					<span
						class={[
							'absolute top-0 -left-4 h-full w-0.5 transition-colors',
							active ? 'bg-neutral-900' : 'bg-transparent'
						]}
						aria-hidden="true"
					></span>
					<a
						href={`#${item.id}`}
						class={[
							'block text-[1em] leading-snug no-underline transition-colors',
							active ? 'font-medium text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
						]}
					>
						{item.title}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
