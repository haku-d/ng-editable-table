const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  // ...nx.configs['flat/angular'],
  // ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    extends: [
      'plugin:@nx/angular',
      'plugin:@angular-eslint/template/process-inline-templates',
    ],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['*.html'],
    extends: ['plugin:@nx/angular-template'],
    rules: {},
  },
];
