
import { writeFile } from 'node:fs/promises';

import { build } from 'esbuild';


console.log(
  `\n> BUILDING\n`
);

const result = await build({
  platform: 'node',
  format: 'esm',
  outfile: 'dist/index.mjs',
  entryPoints: [
    'src/index.ts',
  ],
  bundle: true,
  tsconfig: 'tsconfig.app.json',
  metafile: true,
  sourcemap: 'linked',
  minify: true,

}).catch(error => {
  console.error(error);
  process.exit(1);

});

const {
  warnings,
  errors,
  metafile,

} = result;

for (const message of errors) {
  console.error(message.location, message.text);
}

for (const message of warnings) {
  console.warn(message.location, message.text);
}

await writeFile(
  `bundle.meta.json`,
  JSON.stringify(metafile, null, 4)
);
