const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: './src/popup/index.tsx',
    options: './src/options/index.tsx',
  },

  output: {
    path: path.join(__dirname, 'web-ext', 'out'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ]
  },

  module: {
    rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript', {
            }],
          },
        },
        {
          test:/\.css$/,
          use:['style-loader','css-loader']
        }
    ]
  },

  plugins: [
    new MonacoWebpackPlugin({
      languages: ['json']
    }),
    /*
    new CopyWebpackPlugin({
      patterns: [{
        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
      }],
    }),
    */
  ]
};