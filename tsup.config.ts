// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/log.ts'], // or 'index.ts' if that's your entry point
  format: ['esm', 'cjs'],
  dts: true,
  minify: false, // keep readable logs for dev, true for prod
  splitting: false, // single-file output
  clean: true,
  outDir: 'dist',
  outExtension({ format }) {
    return format === 'esm' ? { js: '.mjs' } : { js: '.cjs' };
  }
}));
