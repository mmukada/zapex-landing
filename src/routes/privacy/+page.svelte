<script lang="ts">
	import EarlyAccessLink from '$lib/components/EarlyAccessLink.svelte';
	import PolicySection from '$lib/components/PolicySection.svelte';
	import PolicyToc from '$lib/components/PolicyToc.svelte';
	import SectionFrame from '$lib/components/SectionFrame.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { COMPANY_NAME, SITE_DOMAIN, SITE_NAME } from '$lib/config';

	const title = `Privacy Policy | ${SITE_NAME}`;
	const description = `How ${COMPANY_NAME} collects, uses and protects your personal data when you visit ${SITE_DOMAIN} or email us about the ${SITE_NAME} address and location service.`;

	// Date the policy last changed; update when the content is revised, along
	// with the page's <lastmod> in static/sitemap.xml.
	const lastUpdated = { iso: '2026-11-11', text: '11 November 2026' };

	// The numbered sections, shared with the "On this page" table of contents.
	const sections = [
		{ id: 'information-we-collect', title: 'Information we collect' },
		{ id: 'how-we-use-your-information', title: 'How we use your information' },
		{ id: 'legal-basis-for-processing', title: 'Legal basis for processing' },
		{ id: 'cookies', title: 'Cookies' },
		{ id: 'sharing-your-information', title: 'Sharing your information' },
		{ id: 'data-retention', title: 'Data retention' },
		{ id: 'your-rights', title: 'Your rights' },
		{ id: 'contact-us', title: 'Contact us' },
		{ id: 'changes-to-this-policy', title: 'Changes to this policy' }
	];
</script>

<Seo {title} {description} />

<SectionFrame id="privacy" labelledBy="privacy-heading" fade>
	<div
		class="max-w-layout mx-auto grid w-full grid-cols-1 gap-x-12 gap-y-10 px-6 pt-16 pb-16 sm:px-10 sm:pt-20 sm:pb-24 lg:grid-cols-[1fr_220px]"
	>
		<article
			class="min-w-0 [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors hover:[&_a]:text-neutral-800"
		>
			<div class="mb-8">
				<h1
					id="privacy-heading"
					class="font-system mb-1 text-[1em]/[1.25] font-semibold text-balance"
				>
					Privacy policy
				</h1>
				<span class="text-[1em] text-neutral-500">
					Last updated: <time datetime={lastUpdated.iso}>{lastUpdated.text}</time>
				</span>
			</div>
			<div
				class="flex flex-col gap-1 text-[1em]/[1.7] font-[420] text-neutral-700 [&_li]:mt-1 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-6"
			>
				<section class="flex flex-col gap-3 pb-8">
					<p>
						This Privacy Policy explains how {COMPANY_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;)
						collects, uses and protects your personal data when you visit
						{SITE_DOMAIN} or email us about the {SITE_NAME} service. We are the data controller responsible
						for your personal data.
					</p>
				</section>

				<PolicySection number={1} {...sections[0]}>
					<p>We collect the following categories of personal data:</p>
					<ul>
						<li>
							<strong>Contact details</strong> you provide directly when you email us for early access
							or get in touch: your email address, your name, and whatever else you choose to tell us,
							such as your company.
						</li>
						<li>
							<strong>Technical data</strong> that the company hosting this site records when you visit
							it: your IP address and the pages you request, kept for security. This site has no forms,
							no accounts and no analytics of its own.
						</li>
					</ul>
				</PolicySection>

				<PolicySection number={2} {...sections[1]}>
					<ul>
						<li>To respond to enquiries and manage your place on the early access list.</li>
						<li>To send you news of the service that you have asked for.</li>
						<li>To keep the site secure and to comply with our legal obligations.</li>
					</ul>
				</PolicySection>

				<PolicySection number={3} {...sections[2]}>
					<p>
						We process your personal data under the UK GDPR on the basis of your consent, our
						legitimate interests in answering you and in keeping the site secure, and where
						necessary to comply with a legal obligation.
					</p>
				</PolicySection>

				<PolicySection number={4} {...sections[3]}>
					<p>
						This site sets no cookies, and has no advertising and no analytics. You can control
						cookies through your browser settings.
					</p>
				</PolicySection>

				<PolicySection number={5} {...sections[4]}>
					<p>
						We do not sell your personal data. We share it only with service providers who help us
						operate the site, and where required by law. They are:
					</p>
					<ul>
						<li>
							<strong>GitHub</strong> (GitHub, Inc.), which hosts this site with GitHub Pages and records
							the IP addresses of its visitors for security. GitHub may process them in the United States,
							under its own safeguards.
						</li>
						<li>
							<strong>Google Workspace</strong> (Google Cloud EMEA Ltd), which provides our email, and
							so holds the messages you send us.
						</li>
					</ul>
				</PolicySection>

				<PolicySection number={6} {...sections[5]}>
					<p>
						We keep your personal data only for as long as necessary to fulfil the purposes set out
						in this policy, after which it is deleted or anonymised.
					</p>
				</PolicySection>

				<PolicySection number={7} {...sections[6]}>
					<p>Under UK data protection law you have the right to:</p>
					<ul>
						<li>Access a copy of the personal data we hold about you.</li>
						<li>Request correction or deletion of your personal data.</li>
						<li>Object to or restrict our processing of your personal data.</li>
						<li>Request portability of your personal data.</li>
						<li>Withdraw consent at any time.</li>
						<li>Lodge a complaint with the ICO.</li>
					</ul>
				</PolicySection>

				<PolicySection number={8} {...sections[7]}>
					<p>
						For any questions about this policy or to exercise your rights,
						<EarlyAccessLink subject="Privacy">email us</EarlyAccessLink>.
					</p>
				</PolicySection>

				<PolicySection number={9} {...sections[8]}>
					<p>
						We may update this Privacy Policy from time to time. Any changes will be posted on this
						page with a revised &ldquo;Last updated&rdquo; date.
					</p>
				</PolicySection>

				<p class="pt-6">
					<a href="/">&larr; Back to home</a>
				</p>
			</div>
		</article>

		<PolicyToc items={sections} />
	</div>
</SectionFrame>
