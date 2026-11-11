<script lang="ts">
	import { page } from '$app/state';
	import { SITE_NAME } from '$lib/config';

	const notFound = $derived(page.status === 404);
	const heading = $derived(notFound ? 'Page not found' : 'Something went wrong');
</script>

<svelte:head>
	<title>{heading} | {SITE_NAME}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="max-w-layout mx-auto flex flex-col items-center gap-5 px-4 py-32 text-center">
	<h1 class="text-[2rem]/[1.25] font-[640] text-[#0c0c0e]">{heading}</h1>
	<p class="text-lg/[1.6] text-neutral-500">
		{notFound ? 'That address is not on this site.' : 'Please try again in a moment.'}
	</p>
	<a class="text-accent hover:text-navy text-sm font-medium hover:underline" href="/">
		Return to the homepage
	</a>
</section>
