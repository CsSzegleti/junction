const { build } = require('esbuild');
const { dependencies } = require('../package.json');
/**
 * @type {import('esbuild').BuildOptions}
 */
const sharedConfig = {
	entryPoints: ['src/index.ts'],
	bundle: true,
	minify: true,
	external: Object.keys(dependencies),
};

(async () => {
	process.stdout.write('$ -----------------------------------\r\n');
	await build({
		...sharedConfig,
		platform: 'node', // for CJS
		outfile: 'dist/index.cjs.js',
	})
		.then(() => {
			process.stdout.write('$ index.cjs.js bundle file created...\r\n');
			process.stdout.write('$ -----------------------------------\r\n');
		})
		.catch(() => process.exit(1));

	await build({
		...sharedConfig,
		outfile: 'dist/index.esm.js',
		platform: 'neutral', // for ESM
		format: 'esm',
	})
		.then(() => {
			process.stdout.write('$ index.esm.js bundle file created...\r\n');
			process.stdout.write('$ -----------------------------------\r\n');
		})
		.catch(() => process.exit(1));
})();
