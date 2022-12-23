
import type { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

import path from 'node:path';


const config: Configuration = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-typescript', {
              }],
              ['@babel/preset-env', {
                targets: 'defaults',
              }],
            ],
          },
        },
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  optimization: {
    chunkIds: 'named',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
        },
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.mjs',
  },
};

export default config;
