import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
   // Base JavaScript recommended rules
   js.configs.recommended,

   // TypeScript configuration
   {
      files: ['**/*.ts'],
      languageOptions: {
         parser: tsparser,
         ecmaVersion: 'latest',
         sourceType: 'module'
      },
      plugins: {
         '@typescript-eslint': tseslint
      },
      globals: {
        ...globals.node,
        ...globals.es2021, // Add modern JavaScript globals
      },
      rules: {
         // Your existing rules
         '@typescript-eslint/no-explicit-any': 'error',
         '@typescript-eslint/no-unused-vars': 'error',
         'prefer-const': 'error',
         'no-var': 'error',

         // Object destructuring formatting
         'object-curly-newline': [
            'error',
            {
               ObjectExpression: { multiline: true, minProperties: 3 },
               ObjectPattern: { multiline: true, minProperties: 3 },
               ImportDeclaration: { multiline: true, minProperties: 3 },
               ExportDeclaration: { multiline: true, minProperties: 3 }
            }
         ],

         // Add your Prettier-like formatting rules from .vscode/settings
         curly: 'error',
         'dot-notation': 'error',
         'no-undef-init': 'error',
         'no-useless-rename': 'error',
         'no-useless-return': 'error',
         'object-shorthand': 'error',
         'one-var': [
            'error',
            {
               initialized: 'never',
               uninitialized: 'always'
            }
         ],
         'prefer-template': 'error',
         'array-bracket-spacing': ['error', 'always'],
         'generator-star-spacing': ['error', 'both'],
         'space-before-function-paren': ['error', 'always'],
         'yield-star-spacing': ['error', 'both']
      }
   },

   // Prettier config (disables conflicting ESLint rules)
   prettier,

   // Ignore patterns
   {
      ignores: ['node_modules/', 'dist/', 'build/', '*.js', 'coverage/', '**/*.js']
   }
];
