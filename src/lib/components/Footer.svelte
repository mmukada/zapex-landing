<script lang="ts">
	import { COMPANY_NAME } from '$lib/config';

	const year = new Date().getFullYear();
</script>

<footer
	class="font-system max-w-layout mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-6 text-[0.725rem] font-medium text-neutral-500"
>
	<p>&copy; {year} {COMPANY_NAME}.</p>
	<nav aria-label="Footer" class="flex gap-x-6">
		<a
			href="/privacy"
			class="text-accent hover:text-navy no-underline transition-colors hover:underline"
		>
			Privacy Policy
		</a>
	</nav>
</footer>
