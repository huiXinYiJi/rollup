import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/scripts/main.js',
  output: {
    file: 'build/js/main.min.js',
    format: 'iife',
    sourceMap: 'inline',
  },
  plugins: [
    resolve({
      jsnext: true, // 将 Node 包转换为 ES2015 模块
      main: true,
      browser: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    eslint({
      exclude: [
        'src/styles/**',
      ]
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ]
};