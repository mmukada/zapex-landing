// Fails when the built site has an email address in it, as text or in a script: the
// site's one address is put together in the browser (src/lib/earlyAccess.ts), so a
// harvester that reads the files finds none.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BUILD = 'build';
const TEXT = /\.(html|js|css|json|xml|txt|svg|webmanifest)$/;
// An address, or the start of a link to one.
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+|mailto:[^`$"'\s]/g;

function files(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		return entry.isDirectory() ? files(path) : [path];
	});
}

const found = files(BUILD)
	.filter((path) => TEXT.test(path))
	.flatMap((path) =>
		(readFileSync(path, 'utf8').match(EMAIL) ?? []).map((match) => `${path}: ${match}`)
	);

if (found.length > 0) {
	console.error('An email address is in the built site:');
	for (const line of found) console.error(`  ${line}`);
	process.exit(1);
}

console.log('No email address in the built site.');
