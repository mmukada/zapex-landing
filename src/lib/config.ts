export const SITE_NAME = 'Zapex';

/** Legal entity behind the service, used in copyright and legal copy. */
export const COMPANY_NAME = 'Zapex Technologies';

/** Bare domain, for prose. */
export const SITE_DOMAIN = 'zapex.co.uk';

/** Origin of the site, without a trailing slash: canonical URLs and structured data are built on it. */
export const SITE_URL = 'https://www.zapex.co.uk';

/** The node that stands for the company wherever structured data refers to it. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Image of link previews, for Open Graph and structured data. */
export const SHARE_IMAGE = {
	url: `${SITE_URL}/images/og-image.png`,
	width: 1200,
	height: 630,
	alt: `${SITE_NAME}: address and location APIs for the UK`
};
