import { dts } from 'rollup-plugin-dts';

export default {
  input: 'temp/index.d.ts',
  output: {
    file: 'types/vue3-track-plush.d.ts',
    format: 'esm',
  },
  plugins: [dts()],
  external: ['vue'],
};

