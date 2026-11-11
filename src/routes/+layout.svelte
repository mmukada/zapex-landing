<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Topbar from '$lib/components/Topbar.svelte';

	let { children } = $props();
</script>

<Topbar />

<main>
	{@render children()}
</main>

<Footer />
