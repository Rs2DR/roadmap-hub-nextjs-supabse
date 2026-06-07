import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineCustomConfig } from './configs/eslint/index.js';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	...defineCustomConfig(),

	globalIgnores(['.next/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
