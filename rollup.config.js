import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import filesize from 'rollup-plugin-filesize';

module.exports = [
  {
    input: './dts/index.d.ts',
    output: [
      {
        file: 'lib/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [
      dts(),
    ],
  },
  {
    input: './src/index.ts',
    output: [
      {
        file: 'lib/index.js',
        format: 'cjs',
      },
      {
        file: 'lib/index.esm.js',
        format: 'es',
      },
    ],
    plugins: [
      nodeResolve({
        extensions: [
          '.js',
          '.ts',
        ],
      }),
      babel({
        babelrc: true,
        envName: 'esm',
        extensions: [
          '.js',
          '.ts',
        ],
      }),
      filesize(),
    ],
  },
];
