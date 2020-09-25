import { terser } from "rollup-plugin-terser";
                
export default {
    input: 'mjs/forecast.mjs',
    output: [
        { file: 'dist/js/forecast.js', formate: 'iife'},
        { file: 'dist/js/forecast.min.js', formate: 'iife', plugins: [terser()]}
    ]
}