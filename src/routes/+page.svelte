<script lang="ts">
	import HeroSection from '$lib/components/HeroSection.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import ProductsSection from '$lib/components/products/ProductsSection.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { COMPANY_NAME, ORGANIZATION_ID, SHARE_IMAGE, SITE_NAME, SITE_URL } from '$lib/config';

	const title = `UK Address Lookup, Geocoding & Store Locator APIs | ${SITE_NAME}`;
	const description =
		'UK address autocomplete, postcode lookup, geocoding and branch locator APIs and widgets, so people enter the right address and find the right place.';

	const url = `${SITE_URL}/`;
	const websiteId = `${SITE_URL}/#website`;

	const schema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': ORGANIZATION_ID,
				name: SITE_NAME,
				legalName: COMPANY_NAME,
				url,
				logo: `${SITE_URL}/images/logo.svg`,
				description,
				areaServed: { '@type': 'Country', name: 'United Kingdom' }
			},
			{
				'@type': 'WebSite',
				'@id': websiteId,
				name: SITE_NAME,
				url,
				description,
				inLanguage: 'en-GB',
				publisher: { '@id': ORGANIZATION_ID }
			},
			{
				'@type': 'WebPage',
				'@id': `${SITE_URL}/#webpage`,
				url,
				name: title,
				description,
				inLanguage: 'en-GB',
				isPartOf: { '@id': websiteId },
				about: { '@id': ORGANIZATION_ID },
				primaryImageOfPage: { '@type': 'ImageObject', ...SHARE_IMAGE, caption: SHARE_IMAGE.alt },
				// The list of products, which ProductsSection describes.
				mainEntity: { '@id': `${SITE_URL}/#products` }
			}
		]
	};
</script>

<Seo {title} {description} />
<JsonLd {schema} />

<HeroSection />
<ProductsSection />
