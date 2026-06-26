import promise from 'eslint-plugin-promise';
import { defineConfig } from 'eslint/config';

export const promiseConfig = defineConfig({
  plugins: {
    promise,
  },

  rules: {
    'promise/no-return-in-finally': 'error',
    'promise/param-names': 'error',
    'promise/valid-params': 'error',

    'promise/no-nesting': 'warn',
    'promise/no-callback-in-promise': 'warn',

    'promise/prefer-await-to-then': 'warn',
    'promise/prefer-await-to-callbacks': 'off',

    'promise/catch-or-return': ['error', { allowFinally: true }],
  },
});
