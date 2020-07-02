module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', '@ehacke/eslint-config', 'plugin:import/typescript'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'class-methods-use-this': 'off',
    'jsdoc/check-param-names': 'off',
    'jsdoc/require-jsdoc': 'off',
    'require-jsdoc': 'off',
    'unicorn/expiring-todo-comments': 'error',
    'unicorn/filename-case': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.json'],
      },
      typescript: {},
    },
    jsdoc: {
      mode: 'typescript',
    },
  },
};
