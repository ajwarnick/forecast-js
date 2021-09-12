import { terser } from "rollup-plugin-terser";
                
export default [
    {
        input: 'mjs/forecast.mjs',
        output: {
            file: 'dist/js/forecast.js',
            format: 'iife',
        }
    },
    {
        input: 'mjs/forecast.mjs',
        output: {
            file: 'dist/js/forecast.min.js',
            format: 'iife',
            plugins: [terser()]
        }
    }
  ]
  