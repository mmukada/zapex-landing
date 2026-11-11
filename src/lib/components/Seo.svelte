<script lang="ts">
	import { page } from '$app/state';
	import { COMPANY_NAME, SHARE_IMAGE, SITE_NAME, SITE_URL } from '$lib/config';

	interface Props {
		/** Document title. Keep to about 60 characters: keywords first, brand last. */
		title: string;
		/** Meta description. Keep to about 155 characters. */
		description: string;
	}

	let { title, description }: Props = $props();

	const canonical = $derived(`${SITE_URL}${page.url.pathname}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={COMPANY_NAME} />
	<meta name="robots" content="index, follow, max-image-preview:large" />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={SHARE_IMAGE.url} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content={String(SHARE_IMAGE.width)} />
	<meta property="og:image:height" content={String(SHARE_IMAGE.height)} />
	<meta property="og:image:alt" content={SHARE_IMAGE.alt} />

	<!-- The title, description and image of the card fall back to Open Graph's. -->
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
