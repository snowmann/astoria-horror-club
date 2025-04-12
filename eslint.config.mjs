import next from '@next/eslint-plugin-next'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import testingLibrary from 'eslint-plugin-testing-library'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    plugins: {
      '@next/next': next,
      '@typescript-eslint': typescriptEslint,
      'testing-library': testingLibrary,
      prettier: prettier,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      'prettier/prettier': 'warn',
      'testing-library/no-debugging-utils': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
    },
  },
]
