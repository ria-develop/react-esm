import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';
import JSX from 'react/jsx-runtime';
import fs from 'node:fs';

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist');

const src = [
  `import React from 'react';`,
  `import ReactDOM from 'react-dom';`,
  `import ReactDOMClient from 'react-dom/client';`,
  `import JSX from 'react/jsx-runtime';`,
  ''
];
const libs = Object.entries({
  React, ReactDOM, ReactDOMClient, JSX
});

const declared = new Set();
for (const [name, lib] of libs) {
  for (const prop of Object.keys(lib)) {
    if (prop.startsWith('_') || prop.startsWith('unstable') || declared.has(prop)) {
      continue;
    }
    src.push(`export const ${prop} = ${name}.${prop} as typeof ${name}.${prop};`);
    declared.add(prop);
  }
}

src.push(
  `export default {
  ...React,
  ...ReactDOM,
  ...ReactDOMClient,
  ...JSX
} as typeof React & typeof ReactDOM & typeof ReactDOMClient & typeof JSX;`
);

fs.writeFileSync('./dist/react.ts', src.join('\n'));
console.log('Created react.ts source');
await Bun.$`tsc`;
console.log('Created react.d.ts declaration');

type BuildConfig = Parameters<typeof Bun.build>[0];

const config: BuildConfig = {
  root: 'dist',
  entrypoints: ['dist/react.ts'],
  outdir: './dist'
};

const builds: BuildConfig[] = [
  { ...config, sourcemap: 'inline', naming: { entry: './react.js' } },
  { ...config, minify: true, naming: { entry: 'react.min.js' }, define: { 'process.env.NODE_ENV': '"production"' } }
];

for (const build of builds) {
  console.log(await Bun.build(build));
}