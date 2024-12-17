# @ria-develop/react-esm

**ESM Build for React**

This package provides an ECMAScript Module (ESM) build for React, making it easier to consume React in ESM-based environments. It includes type definitions and ensures compatibility with modern JavaScript module workflows.

## Features

- Fully compatible with ESM environments
- Works with the latest versions of React and React DOM
- Includes TypeScript definitions
- Simplified imports for both React and React DOM

## Installation

You can install the package using a package manager like `npm`:

```bash
npm install @ria-develop/react-esm
```

Or using `bun`:

```bash
bun add @ria-develop/react-esm
```

## Usage

### Default Import

Import React and React DOM directly from the package:

```javascript
import React from '@ria-develop/react-esm';
import ReactDOM from '@ria-develop/react-esm/client';
```

### TypeScript Support

The package includes comprehensive TypeScript definitions, which will automatically work when imported into your TypeScript projects.

## Exports Map

This package provides an [exports map](https://nodejs.org/api/packages.html#exports), ensuring correct resolution of modules:

- The root entry point `@ria-develop/react-esm` maps to the React implementation.
- The `@ria-develop/react-esm/client` entry point maps to React DOM.

## Bundler Externalization

When using this package with popular JavaScript bundlers like **Webpack**, **Vite**, or **Rollup**, you may need to externalize `react` and `react-dom` to avoid bundling these libraries unnecessarily. Externalizing ensures they are resolved at runtime from the environment rather than bundled into your output.

**Webpack:**

```javascript
module.exports = {
  externals: {
    react: 'react',          // Externalize React
    'react-dom': 'react-dom' // Externalize ReactDOM
  }
};
```

**Rollup:**

Install the external package if not installed:

```bash
npm install @rollup/plugin-node-resolve @rollup/plugin-commonjs --save-dev
```

Then configure Rollup:

```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'bundle.js',
    format: 'esm'
  },
  external: ['react', 'react-dom'], // Externalize dependencies
  plugins: [resolve(), commonjs()]
};
```

**Vite:**

Vite automatically treats `react` and `react-dom` as externalized dependencies. However, ensure you have the proper aliases configured in `vite.config.js`:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      react: '@ria-develop/react-esm',
      'react-dom': '@ria-develop/react-esm/client'
    }
  }
});
```

---

## Example: Using an Import Map

The following is an example of how you can use this package in a web-based ESM environment with an import map:

```html
<!doctype html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title>Example of React ESM use case</title>
  <script type="importmap">
    {
      "imports": {
        "react/jsx-runtime": "https://cdn.jsdelivr.net/npm/@ria-develop/react-esm",
        "react": "https://cdn.jsdelivr.net/npm/@ria-develop/react-esm",
        "react-dom": "https://cdn.jsdelivr.net/npm/@ria-develop/react-esm",
        "react-dom/client": "https://cdn.jsdelivr.net/npm/@ria-develop/react-esm"
      }
    }
  </script>
  <script type="module">
    import { createRoot } from "react-dom/client";
    import { StrictMode, Suspense } from "react";
    import { jsx, jsxs } from "react/jsx-runtime";

    function App() {
      return jsxs(Suspense, { fallback: "Loading...", children: ['hello'] });
    }

    const root = createRoot(document.getElementById("root"));
    root.render(jsx(StrictMode, { children: jsx(App, {}) }));
  </script>
</head>
<body>
<div id="root"></div>
</body>
</html>
```

This demonstrates how you can leverage import maps and properly set up the `jsx-runtime` in an ESM-based environment to render a simple React application in the browser.

---

## Build & Development

The package is built using [Bun](https://bun.sh/) and TypeScript. To rebuild the package:

1. Clone the repository:
   ```bash
   git clone https://github.com/ria-develop/react-esm.git
   cd react-esm
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Build the package:
   ```bash
   bun run build
   ```

## Repository

Find the source code and contribute at [GitHub](https://github.com/ria-develop/react-esm).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).