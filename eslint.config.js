import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },

  { languageOptions: { globals: globals.browser } },

  pluginJs.configs.recommended,

  ...tseslint.configs.recommended,

  ...pluginVue.configs['flat/essential'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  {
    rules: {
      eqeqeq: ['error', 'always'], // Enforces === and !==

      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
        },
      ],
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: [],
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 1,
          multiline: 1,
        },
      ],

      // Prettier
      'prettier/prettier': [
        'error',
        {
          semi: false, // Disable semicolons
          singleQuote: true, // Use single quotes
          trailingComma: 'all', // Use trailing commas
          tabWidth: 2, // 2 spaces for indentation
          useTabs: false, // Use spaces instead of tabs
          printWidth: 80, // Max line length
        },
      ],
    },
  },
]
