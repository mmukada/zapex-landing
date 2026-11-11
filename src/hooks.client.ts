/** Reload once when a stale tab requests a GC'd / missing Vite chunk. */
const PRELOAD_RELOAD_KEY = 'vite:preload-reloaded';

window.addEventListener('vite:preloadError', (event) => {
	event.preventDefault();
	try {
		if (sessionStorage.getItem(PRELOAD_RELOAD_KEY)) return;
		sessionStorage.setItem(PRELOAD_RELOAD_KEY, '1');
	} catch {
		/* private mode / quota — still attempt one reload */
	}
	window.location.reload();
});
