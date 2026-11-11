// The one email address of the site, kept out of what a harvester reads. It is in no
// page as text and in no script as a string: it is held as numbers, and made into a
// `mailto:` link in the browser. `yarn check:emails` fails a build that has an address
// in it.

// Each character's code, plus 7 and its position.
const CODES = [
	108, 105, 123, 118, 132, 109, 112, 113, 116, 131, 132, 82, 141, 117, 133, 123, 143, 70, 124, 137,
	73, 145, 136
];

/** The link that starts an email to us, with its subject. Call it in the browser only. */
export function earlyAccessHref(subject: string): string {
	const address = CODES.map((code, i) => String.fromCharCode(code - 7 - i)).join('');
	return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
}
