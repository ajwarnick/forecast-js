import { terser } from "rollup-plugin-terser";
                
export default {
    input: 'mjs/forecast.mjs',
    output: [
        { file: 'js/forecast.js', formate: 'iife'},
        { file: 'js/forecast.min.js', formate: 'iife', plugins: [terser()]}
    ]
}