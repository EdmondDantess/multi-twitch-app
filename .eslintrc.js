config = require('eslint-config-standard-typescript-prettier');

module.exports = {
  ...config,
  parserOptions: { project: './tsconfig.json' },
  rules: {
    ...config.rules,
    'no-use-before-define': 'off',
  },
};
