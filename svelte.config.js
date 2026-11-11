import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Every page is prerendered to a file. GitHub Pages serves `/privacy` from
		// `privacy.html`, and `404.html` for an address that is not on the site.
		adapter: adapter({ fallback: '404.html' })
	}
};

export default config;
