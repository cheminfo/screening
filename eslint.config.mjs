import cheminfo from 'eslint-config-cheminfo';
import globals from 'globals';

export default [
  ...cheminfo,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'unicorn/prefer-structured-clone': 'off', // we need JSON.parse(JSON.stringify(reagents)) to get rid of visualizer hacks
      'unicorn/no-array-push-push': 'off',
      "unicorn/prefer-single-call": "off",
      "unicorn/no-immediate-mutation": "off",
    },
  },
];
