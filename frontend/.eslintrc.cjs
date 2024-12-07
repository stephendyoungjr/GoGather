module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended', // Adds accessibility linting rules
    'plugin:import/errors', // Ensures proper imports
    'plugin:import/warnings',
    'plugin:import/react',
    'plugin:prettier/recommended', // Integrates Prettier for consistent formatting
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Supports modern file extensions
      },
    },
  },
  plugins: [
    'react-refresh',
    'jsx-a11y', // Accessibility plugin
    'import', // Import management plugin
  ],
  ignorePatterns: [
    'dist',
    'node_modules',
    '*.config.js', // Ignore config files if applicable
    '*.cjs', // Optional: Ignore CommonJS files
  ],
  rules: {
    // React-specific rules
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Turn off PropTypes if using TypeScript
    'react/jsx-uses-react': 'off', // Not needed in React 17+ (jsx-runtime)
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+ (jsx-runtime)

    // Accessibility rules
    'jsx-a11y/anchor-is-valid': 'warn', // Warn on invalid anchor tags
    'jsx-a11y/alt-text': 'warn', // Ensure images have alt text

    // Import rules
    'import/no-unresolved': 'error', // Error for unresolved imports
    'import/named': 'error', // Ensure named imports exist
    'import/default': 'error', // Ensure a default export exists

    // Other custom rules
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn on unused variables, but allow `_` prefix
    'no-console': 'warn', // Warn on console.log usage
    'prettier/prettier': 'warn', // Ensure Prettier consistency
  },
};
