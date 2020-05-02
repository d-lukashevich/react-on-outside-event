import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';

export default {
    input: {
        index: 'src/index.tsx',
        useOutsideEvent: 'src/useOutsideEvent.tsx'
    },
    output: [
        {
            dir: 'dist',
            format: 'cjs',
            exports: 'named'
        },
        {
            dir: 'dist/esm',
            format: 'es',
            exports: 'named'
        }
    ],
    plugins: [
        external(),
        url({ exclude: ['**/*.svg'] }),
        resolve(),
        typescript({
            useTsconfigDeclarationDir: true,
            rollupCommonJSResolveHack: true,
            clean: true
        }),
        commonjs()
    ]
};
