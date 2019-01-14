module.exports = {
  extends: [
    'eslint-config-standard',
    'eslint-config-standard-react'
  ],
  parser: 'babel-eslint',
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jest: true
  },
  rules: {
    'react/prop-types': 0,
    'arrow-parens': ['error', 'as-needed'],
    'no-extra-parens': ['error', 'all', {
      nestedBinaryExpressions: false
    }]
  },
  settings: {
    react: {version: 'detect'}
  }
}
