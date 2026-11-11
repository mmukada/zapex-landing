<script lang="ts">
	interface Props {
		schema: Record<string, unknown>;
	}

	let { schema }: Props = $props();
</script>

<!--
	svelte:head escapes text content by default, so a literal <script> tag can't be
	written directly here — the JSON is serialised and injected via {@html} instead.
	The tag itself is split across concatenated strings so tooling (the Svelte
	compiler's script-block scanner, eslint-plugin-svelte) doesn't mistake this
	string for a real <script> element.
-->
<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON.stringify output only, not user input -->
	{@html '<' + 'script type="application/ld+json">' + JSON.stringify(schema) + '</' + 'script>'}
</svelte:head>
