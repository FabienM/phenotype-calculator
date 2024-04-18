// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import formatjs from 'eslint-plugin-formatjs';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      formatjs
    },
    "rules": {
      "formatjs/enforce-id": [
        "error",
        {
          "idInterpolationPattern": "[sha512:contenthash:base64:6]"
        }
      ]
    }
  }
);
