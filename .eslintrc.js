config = require('eslint-config-standard-typescript-prettier');

module.exports = {
  ...config,
  parserOptions: { project: './tsconfig.json' },
  rules: {
    ...config.rules,
    'no-use-before-define': 'off',
  },
  overrides: [
    {
      files: '**/*.ts',
      // TypeScript-only configuration
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint'],
    },
  ],
};
