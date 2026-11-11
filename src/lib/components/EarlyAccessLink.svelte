<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { earlyAccessHref } from '$lib/earlyAccess';

	interface Props {
		class?: string;
		/** The subject the email starts with. */
		subject?: string;
		children: Snippet;
	}

	let { class: className, subject = 'Early access to Zapex', children }: Props = $props();

	// Set once the page runs in the browser, so the prerendered page has no address in it.
	let href = $state<string>();

	onMount(() => {
		href = earlyAccessHref(subject);
	});
</script>

<a class={className} {href}>{@render children()}</a>
