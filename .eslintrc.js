module.exports = {
    parser: 'babel-eslint',
    extends: 'airbnb-base/legacy',
    env: {
      mocha: true,
      browser: true,
      es6: true
    },
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module'
    },
    rules:{
      "linebreak-style": 0,
      'comma-dangle': [2, 'never'],
      'no-underscore-dangle': 0,
      'import/no-extraneous-dependencies': 0,
      'arrow-parens': ['error', 'as-needed'],
      'global-require': 0,
      'jsx-quotes': ['error', 'prefer-single'],
      'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
      'jsx-a11y/anchor-has-content': 0,
      'react/require-default-props': 0,
      'no-return-await': 0,
      'max-len': [1, 300],
      'no-shadow': 0
    }
  };