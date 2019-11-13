import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

import pkg from './package.json';

const input = 'src/index.ts';
const globals = { cypress: 'Cypress' };
const external = Object.keys(globals);
const license = {
  output: {
    preamble: [
      '/**',
      ' * cypress-keycloak v' + process.env.npm_package_version,
      ' *',
      ' * Copyright (c) 2019 babangsund',
      ' *',
      ' * This source code is licensed under the MIT license found in the',
      ' * LICENSE file in the root directory of this source tree.',
      ' */',
    ].join('\n'),
  },
};

export default {
  input,
  external,
  plugins: [
    commonjs(),
    typescript(),
    process.env.NODE_ENV === 'production' && terser(license),
  ],
  output: [
    {
      globals,
      format: 'esm',
      file: pkg.module,
    },
    {
      globals,
      format: 'cjs',
      file: pkg.main,
    },
  ],
};
